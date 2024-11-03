import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
// import schema from "./schema";
dotenv.config();

export const db = drizzle({
  connection: {
    // Production
    // connectionString:
    //   "postgresql://postgres:pchpRIpPTvpVVhfBmntVlYbBsphGVEzW@junction.proxy.rlwy.net:53533/railway",
    // Development
    connectionString:
      "postgresql://postgres:isyawal161104@localhost:5432/campus-application",
  }
}); 
