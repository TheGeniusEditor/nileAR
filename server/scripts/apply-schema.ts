import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const schemaPath = path.resolve(process.cwd(), "sql", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

const databaseUrl = process.env.DATABASE_URL;
const useSsl = (process.env.DB_SSL ?? "true") === "true";

if (!databaseUrl) {
  console.error("DATABASE_URL is missing in .env");
  process.exit(1);
}

const { Client } = pg;

const client = new Client({
  connectionString: databaseUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined
});

const run = async () => {
  try {
    await client.connect();
    await client.query(schema);
    console.log("Schema applied successfully.");
  } catch (error) {
    console.error("Failed to apply schema:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
};

run();
