import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config.js";
import { query } from "../db.js";
import { authLimiter } from "../middleware/rateLimiters.js";

const router = Router();

const DUMMY_PASSWORD_HASH = "$2b$10$N9qo8uLOickgx2ZMRZo5i.ejFrP8T6F8mT7V0pX0rW2fMQ0m6qK2y";

const registerSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(12).max(128),
  fullName: z.string().max(120).optional()
}).superRefine((value, ctx) => {
  const password = value.password;
  const checks = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];

  if (checks.some((ok) => !ok)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must include upper, lower, number, and symbol characters"
    });
  }
});

const loginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(128)
});

const parseTtlMs = (ttl: string) => {
  const match = ttl.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error("Invalid TTL format");
  }
  const value = Number.parseInt(match[1], 10);
  const unit = match[2];
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };
  return value * multipliers[unit];
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: "strict" as const,
  path: "/api/auth/refresh",
  maxAge: parseTtlMs(config.refreshTokenTtl)
};

const createAccessToken = (userId: string, role: string) => {
  return jwt.sign(
    { sub: userId, role, scope: "hotel-finance" },
    config.jwtAccessSecret,
    {
      expiresIn: config.accessTokenTtl,
      issuer: "hotel-finance-api",
      audience: "hotel-finance-web"
    }
  );
};

const createRefreshToken = async (userId: string, userAgent?: string, ipAddress?: string) => {
  const token = crypto.randomBytes(64).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + parseTtlMs(config.refreshTokenTtl));

  const result = await query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at, user_agent, ip_address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [userId, tokenHash, expiresAt, userAgent ?? null, ipAddress ?? null]
  );

  return { token, id: result.rows[0].id as string, expiresAt };
};

const revokeRefreshToken = async (tokenHash: string, replacedBy?: string) => {
  await query(
    `UPDATE refresh_tokens
     SET revoked_at = now(), replaced_by = $2
     WHERE token_hash = $1 AND revoked_at IS NULL`,
    [tokenHash, replacedBy ?? null]
  );
};

router.post("/register", authLimiter, async (req, res, next) => {
  try {
    const { email, password, fullName } = registerSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const passwordHash = await bcrypt.hash(password, config.bcryptCost);

    const result = await query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, role, created_at`,
      [normalizedEmail, passwordHash, fullName ?? null]
    );

    const user = result.rows[0];
    const accessToken = createAccessToken(user.id, user.role);
    const refreshToken = await createRefreshToken(user.id, req.get("user-agent"), req.ip);

    res.cookie("refresh_token", refreshToken.token, refreshCookieOptions);

    return res.status(201).json({
      user: { id: user.id, email: user.email, role: user.role },
      accessToken
    });
  } catch (error: any) {
    if (error?.code === "23505") {
      return res.status(409).json({ error: { message: "Email already registered" } });
    }
    return next(error);
  }
});

router.post("/login", authLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const userResult = await query(
      `SELECT id, email, role, password_hash, is_active, failed_login_attempts, locked_until
       FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    if (userResult.rowCount === 0) {
      await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
      return res.status(401).json({ error: { message: "Invalid credentials" } });
    }

    const user = userResult.rows[0];

    if (!user.is_active) {
      await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
      return res.status(403).json({ error: { message: "Account disabled" } });
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(423).json({ error: { message: "Account locked. Try again later." } });
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);

    if (!passwordOk) {
      const attempts = Number(user.failed_login_attempts) + 1;
      const lockUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

      await query(
        `UPDATE users
         SET failed_login_attempts = $2, locked_until = $3
         WHERE id = $1`,
        [user.id, attempts, lockUntil]
      );

      return res.status(401).json({ error: { message: "Invalid credentials" } });
    }

    await query(
      `UPDATE users
       SET failed_login_attempts = 0, locked_until = NULL, last_login_at = now()
       WHERE id = $1`,
      [user.id]
    );

    const accessToken = createAccessToken(user.id, user.role);
    const refreshToken = await createRefreshToken(user.id, req.get("user-agent"), req.ip);

    res.cookie("refresh_token", refreshToken.token, refreshCookieOptions);

    return res.status(200).json({
      user: { id: user.id, email: user.email, role: user.role },
      accessToken
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/refresh", authLimiter, async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token as string | undefined;
    if (!refreshToken) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const tokenResult = await query(
      `SELECT rt.id, rt.user_id, rt.expires_at, rt.revoked_at, u.role, u.is_active
       FROM refresh_tokens rt
       JOIN users u ON u.id = rt.user_id
       WHERE rt.token_hash = $1`,
      [tokenHash]
    );

    if (tokenResult.rowCount === 0) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    const tokenRow = tokenResult.rows[0];
    const isExpired = new Date(tokenRow.expires_at) <= new Date();

    if (tokenRow.revoked_at || isExpired) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    if (!tokenRow.is_active) {
      return res.status(403).json({ error: { message: "Account disabled" } });
    }

    const newRefresh = await createRefreshToken(
      tokenRow.user_id,
      req.get("user-agent"),
      req.ip
    );

    await revokeRefreshToken(tokenHash, newRefresh.id);

    const accessToken = createAccessToken(tokenRow.user_id, tokenRow.role);

    res.cookie("refresh_token", newRefresh.token, refreshCookieOptions);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token as string | undefined;
    if (refreshToken) {
      const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
      await revokeRefreshToken(tokenHash);
    }

    res.clearCookie("refresh_token", refreshCookieOptions);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

export default router;
