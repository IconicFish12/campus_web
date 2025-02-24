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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.dosenRelation = exports.dosen = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const jurusan_1 = require("./jurusan");
const drizzle_orm_1 = require("drizzle-orm");
const mata_kuliah_1 = require("./mata_kuliah");
const kelas_1 = require("./kelas");
exports.dosen = (0, pg_core_1.pgTable)("dosen", {
    id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    nip: item.integer().notNull().unique(),
    kode_dosen: item.varchar().unique().notNull(),
    nama_dosen: item.varchar({ length: 256 }).notNull(),
    tempat_lahir: item.varchar({ length: 256 }).notNull(),
    tanggal_lahir: item.date().notNull(),
    jurusanId: item
        .integer()
        .references(() => jurusan_1.jurusan.id)
        .default(1),
    bidang_keahlian: item.text().notNull(),
    alamat: item.text(),
    email: item.varchar({ length: 256 }).unique().notNull(),
    password: item.varchar().notNull(),
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
    kelas: many(kelas_1.kelas),
}));
//# sourceMappingURL=dosen.js.map