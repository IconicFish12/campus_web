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
exports.mataKuliahRelation = exports.mataKuliah = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const jurusan_1 = require("./jurusan");
const dosen_1 = require("./dosen");
const kelas_1 = require("./kelas");
const drizzle_orm_1 = require("drizzle-orm");
const tugas_mahasiswa_1 = require("./tugas_mahasiswa");
exports.mataKuliah = (0, pg_core_1.pgTable)("mata_kuliah", {
    id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    nama_matkul: item.varchar({ length: 256 }).notNull(),
    dosenId: item.integer().references(() => dosen_1.dosen.id).default(1),
    jurusanId: item.integer().references(() => jurusan_1.jurusan.id).default(1),
    kelasId: item.integer().references(() => kelas_1.kelas.id).default(1),
});
exports.mataKuliahRelation = (0, drizzle_orm_1.relations)(exports.mataKuliah, ({ many, one }) => ({
    dosen: one(dosen_1.dosen, {
        fields: [exports.mataKuliah.dosenId],
        references: [dosen_1.dosen.id],
    }),
    jurusan: one(jurusan_1.jurusan, {
        fields: [exports.mataKuliah.jurusanId],
        references: [jurusan_1.jurusan.id],
    }),
    kelas: many(kelas_1.kelas),
    tugas_mahasiswa: many(tugas_mahasiswa_1.tugas_mahasiswa),
}));
//# sourceMappingURL=mata_kuliah.js.map