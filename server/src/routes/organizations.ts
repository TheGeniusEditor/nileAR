import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { query } from "../db.js";
import { config } from "../config.js";
import { sendCorporateCredentialsEmail } from "../services/mailer.js";

const router = Router();

const createOrganizationSchema = z.object({
  name: z.string().min(2).max(160),
  corporateEmail: z.string().email().max(320),
  gst: z.string().max(32).optional().nullable(),
  creditPeriod: z.string().max(60).optional().nullable(),
  paymentTerms: z.string().max(120).optional().nullable(),
  status: z.enum(["active", "on-hold", "inactive"]).default("active")
});

const sendCredentialsSchema = z.object({
  recipientEmail: z.string().email().max(320),
  organizationName: z.string().min(2).max(160),
  userId: z.string().min(4).max(320),
  password: z.string().min(8).max(128)
});

const createOrganizationId = () => {
  const value = Math.floor(100 + Math.random() * 900);
  return `ORG-${value}`;
};

const randomChars = (chars: string, length: number) => {
  let result = "";
  for (let index = 0; index < length; index += 1) {
    const selectedIndex = Math.floor(Math.random() * chars.length);
    result += chars[selectedIndex];
  }
  return result;
};

const createCorporatePassword = () => {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnpqrstuvwxyz";
  const numbers = "23456789";
  const symbols = "!@#$%^&*";
  const all = upper + lower + numbers + symbols;

  const base = [
    randomChars(upper, 1),
    randomChars(lower, 1),
    randomChars(numbers, 1),
    randomChars(symbols, 1),
    randomChars(all, 8)
  ].join("");

  return base
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, name, gst, credit_period, payment_terms, status, created_at
       FROM organizations
       ORDER BY created_at DESC`
    );

    const organizations = result.rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      gst: row.gst as string | null,
      creditPeriod: row.credit_period as string | null,
      paymentTerms: row.payment_terms as string | null,
      status: row.status as string,
      createdAt: row.created_at as string
    }));

    return res.status(200).json({ organizations });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = createOrganizationSchema.parse(req.body);
    const normalizedCorporateEmail = payload.corporateEmail.trim().toLowerCase();

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const organizationId = createOrganizationId();
      const corporateUserId = normalizedCorporateEmail;
      const generatedPassword = createCorporatePassword();
      const corporatePasswordHash = await bcrypt.hash(generatedPassword, config.bcryptCost);

      try {
        const created = await query(
          `INSERT INTO organizations (
             id, name, gst, credit_period, payment_terms, status,
             contact_email, corporate_user_id, corporate_password_hash
           )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING id, name, gst, credit_period, payment_terms, status, corporate_user_id`,
          [
            organizationId,
            payload.name.trim(),
            payload.gst ?? null,
            payload.creditPeriod ?? null,
            payload.paymentTerms ?? null,
            payload.status,
            normalizedCorporateEmail,
            corporateUserId,
            corporatePasswordHash
          ]
        );

        const organization = created.rows[0];

        return res.status(201).json({
          organization: {
            id: organization.id,
            name: organization.name,
            gst: organization.gst,
            creditPeriod: organization.credit_period,
            paymentTerms: organization.payment_terms,
            status: organization.status
          },
          credentials: {
            userId: organization.corporate_user_id,
            password: generatedPassword,
            email: normalizedCorporateEmail
          }
        });
      } catch (error: any) {
        if (error?.code !== "23505") {
          throw error;
        }

        const constraint = String(error?.constraint ?? "");
        if (
          constraint.includes("organizations_contact_email_uniq") ||
          constraint.includes("organizations_corporate_user_id_key")
        ) {
          return res.status(409).json({
            error: { message: "Corporate email already exists for another organization" }
          });
        }
      }
    }

    return res.status(500).json({
      error: { message: "Unable to generate unique credentials. Please try again." }
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/send-credentials", async (req, res, next) => {
  try {
    const payload = sendCredentialsSchema.parse(req.body);

    await sendCorporateCredentialsEmail({
      recipientEmail: payload.recipientEmail.trim().toLowerCase(),
      organizationName: payload.organizationName.trim(),
      userId: payload.userId.trim(),
      password: payload.password
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

export default router;