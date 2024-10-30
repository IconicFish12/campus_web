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
exports.kelasRelation = exports.kelas = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const mahasiswa_1 = require("./mahasiswa");
const mata_kuliah_1 = require("./mata_kuliah");
const jurusan_1 = require("./jurusan");
const dosen_1 = require("./dosen");
exports.kelas = (0, pg_core_1.pgTable)("kelas", {
    id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    nama_kelas: item.varchar({ length: 20 }),
    dosenId: item.integer().references(() => dosen_1.dosen.id),
    jurusanId: item.integer().references(() => jurusan_1.jurusan.id),
    jumlahMahasiswa: item.integer().notNull(),
});
exports.kelasRelation = (0, drizzle_orm_1.relations)(exports.kelas, ({ many, one }) => ({
    mahasiswa: many(mahasiswa_1.mahasiswa),
    mataKuliah: many(mata_kuliah_1.mataKuliah),
    dosen: one(dosen_1.dosen, {
        fields: [exports.kelas.dosenId],
        references: [dosen_1.dosen.id]
    }),
    jurusan: one(jurusan_1.jurusan, {
        fields: [exports.kelas.jurusanId],
        references: [jurusan_1.jurusan.id]
    })
}));
//# sourceMappingURL=kelas.js.map