import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migration",
  dialect: "postgresql",
  dbCredentials: {
    database:  "railway",
    host: "junction.proxy.rlwy.net",
    user: "postgres",
    password: "pchpRIpPTvpVVhfBmntVlYbBsphGVEzW",
    port:  53533,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
