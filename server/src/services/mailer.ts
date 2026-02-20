import nodemailer from "nodemailer";
import { config } from "../config.js";

let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (!config.mailEnabled) {
    throw new Error("Email service is not configured on the server");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    });
  }

  return transporter;
};

export const sendCorporateCredentialsEmail = async (payload: {
  recipientEmail: string;
  organizationName: string;
  userId: string;
  password: string;
}) => {
  const tx = getTransporter();

  await tx.sendMail({
    from: config.smtpFrom,
    to: payload.recipientEmail,
    subject: `Corporate Portal Credentials - ${payload.organizationName}`,
    text: [
      `Hello ${payload.organizationName},`,
      "",
      "Your Corporate Portal login credentials are:",
      `User ID: ${payload.userId}`,
      `Password: ${payload.password}`,
      "",
      "Please sign in and change your password after the first login.",
      ""
    ].join("\n"),
    html: `
      <p>Hello ${payload.organizationName},</p>
      <p>Your Corporate Portal login credentials are:</p>
      <p><strong>User ID:</strong> ${payload.userId}<br/><strong>Password:</strong> ${payload.password}</p>
      <p>Please sign in and change your password after the first login.</p>
    `
  });
};