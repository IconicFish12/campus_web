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
exports.dosenRelation = exports.dosen = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const jurusan_1 = require("./jurusan");
const drizzle_orm_1 = require("drizzle-orm");
const mata_kuliah_1 = require("./mata_kuliah");
exports.dosen = (0, pg_core_1.pgTable)("dosen", {
    id: item.bigint({ mode: "bigint" }).primaryKey(),
    nip: item.integer().notNull().unique(),
    kode_dosen: item.varchar({ length: 3 }).unique().notNull(),
    nama_dosen: item.varchar({ length: 256 }).notNull(),
    tempat_lahir: item.varchar({ length: 256 }).notNull(),
    tanggal_lahir: item.date().notNull(),
    jurusanId: item.integer().references(() => jurusan_1.jurusan.id),
    bidang_keahlian: item.text().notNull(),
    alamat: item.text().notNull(),
    email: item.varchar({ length: 256 }).unique().notNull(),
    password: item.varchar({ length: 15 }).unique().notNull(),
    jenis_kelamin: item
        .varchar({ enum: ["none", "laki-laki", "perempuan"] })
        .default("none"),
});
exports.dosenRelation = (0, drizzle_orm_1.relations)(exports.dosen, ({ one, many }) => ({
    jurusan: one(jurusan_1.jurusan, {
        fields: [exports.dosen.jurusanId],
        references: [jurusan_1.jurusan.id],
    }),
    mataKuliah: many(mata_kuliah_1.mataKuliah),
}));
//# sourceMappingURL=dosen.js.map