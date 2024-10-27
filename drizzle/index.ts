import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
// import * as schema from './schema';

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "campus_app",
  password: process.env.DB_PASSWORD || "",
});

export const db = drizzle({
  connection: { uri: process.env.DATABASE_URL },
  client: poolConnection,
});
