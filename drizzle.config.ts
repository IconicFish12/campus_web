import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migration",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB_NAME || "campus_app",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "isyawal161104",
    port: Number(process.env.DB_PORT) || 5432,
    url: process.env.DB_URL,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
