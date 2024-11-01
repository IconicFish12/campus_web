import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import postgres from "postgres";
dotenv.config();

export const db =  drizzle({
  connection : {
    connectionString : "postgres://postgres:isyawal161104@localhost:5432/campus-application"
  }
})
