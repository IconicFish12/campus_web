"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
// import * as schema from './schema';
exports.db = (0, node_postgres_1.drizzle)({
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
});
