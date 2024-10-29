import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
// import * as schema from './schema';

export const db = drizzle({
  connection: {
    connectionString: "postgres://postgres:isyawal161104@localhost:5432/campus_app",
  },
});
