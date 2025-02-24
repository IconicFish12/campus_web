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
exports.tugas_mahasiswaRelation = exports.tugas_mahasiswa = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const mata_kuliah_1 = require("./mata_kuliah");
const drizzle_orm_1 = require("drizzle-orm");
const nilai_1 = require("./nilai");
exports.tugas_mahasiswa = (0, pg_core_1.pgTable)("tugas_mahasiswa", {
    id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    nama_tugas: item.varchar({ length: 256 }).notNull(),
    mataKuliahId: item.integer().references(() => mata_kuliah_1.mataKuliah.id).default(1),
    desc: item.text().notNull(),
    deadline: item.date().notNull(),
});
exports.tugas_mahasiswaRelation = (0, drizzle_orm_1.relations)(exports.tugas_mahasiswa, ({ many, one }) => ({
    mataKuliah: one(mata_kuliah_1.mataKuliah, {
        fields: [exports.tugas_mahasiswa.mataKuliahId],
        references: [mata_kuliah_1.mataKuliah.id],
    }),
    nilai: one(nilai_1.nilai),
}));
//# sourceMappingURL=tugas_mahasiswa.js.map