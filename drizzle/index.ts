import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
dotenv.config();

export const db = drizzle({
  connection: {
    connectionString:
      "postgresql://postgres:pchpRIpPTvpVVhfBmntVlYbBsphGVEzW@junction.proxy.rlwy.net:53533/railway",
  },
});
