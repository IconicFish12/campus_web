"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
// import * as schema from './schema';
exports.db = (0, node_postgres_1.drizzle)({
    connection: {
        connectionString: "postgres://postgres:isyawal161104@localhost:5432/campus_app",
    },
});
//# sourceMappingURL=index.js.map