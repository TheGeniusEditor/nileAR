import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

interface AccessTokenPayload {
  sub: string;
  role: string;
  scope: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const payload = jwt.verify(token, config.jwtAccessSecret, {
      issuer: "hotel-finance-api",
      audience: "hotel-finance-web"
    }) as AccessTokenPayload;

    req.user = { id: payload.sub, role: payload.role, scope: payload.scope };
    return next();
  } catch (error) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }
};
