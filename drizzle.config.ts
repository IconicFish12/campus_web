import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migration",
  dialect: "postgresql",
  dbCredentials: {
    database: "campus_app",
    host: "localhost",
    user: "postgres",
    password: "isyawal161104",
    port: 5432,
    ssl: false, 
  },
  verbose: true,
  strict: true,
});
