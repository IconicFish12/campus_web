import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migration",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    database: process.env.DB_NAME || "campus_app",
    password: "",
    // port: 3306,
  },
  verbose: true,
  strict: true,
});
