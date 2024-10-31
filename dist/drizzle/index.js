"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_1 = require("@vercel/postgres");
// import { drizzle } from "drizzle-orm/node-postgres";
const vercel_postgres_1 = require("drizzle-orm/vercel-postgres");
// import * as schema from './schema';
exports.db = (0, vercel_postgres_1.drizzle)(postgres_1.sql);
//# sourceMappingURL=index.js.map