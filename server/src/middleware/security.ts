import type { Express } from "express";
import helmet from "helmet";

export const applySecurityMiddleware = (app: Express) => {
  app.use(helmet());
};
