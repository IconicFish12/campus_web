"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nilaiRelation = exports.nilai = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const item = __importStar(require("drizzle-orm/mysql-core"));
const tugas_mahasiswa_1 = require("./tugas_mahasiswa");
const drizzle_orm_1 = require("drizzle-orm");
exports.nilai = (0, mysql_core_1.mysqlTable)("nilai", {
    id: item.int().primaryKey().autoincrement(),
    nilai: item.int().notNull(),
    tugasMahasiswaId: item.int().references(() => tugas_mahasiswa_1.tugas_mahasiswa.id),
});
exports.nilaiRelation = (0, drizzle_orm_1.relations)(exports.nilai, ({ many, one }) => ({
    tugas_mahasiswa: one(tugas_mahasiswa_1.tugas_mahasiswa, {
        fields: [exports.nilai.tugasMahasiswaId],
        references: [tugas_mahasiswa_1.tugas_mahasiswa.id],
    }),
}));
