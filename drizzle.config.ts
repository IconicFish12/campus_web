import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migration",
  dialect: "postgresql",
  dbCredentials: {
    database:  "campus-application",
    host: "localhost",
    user: "postgres",
    password: "isyawal161104",
    port:  5432,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
