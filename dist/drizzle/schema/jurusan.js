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
exports.jurusanRelation = exports.jurusan = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const item = __importStar(require("drizzle-orm/pg-core"));
const mahasiswa_1 = require("./mahasiswa");
const dosen_1 = require("./dosen");
const mata_kuliah_1 = require("./mata_kuliah");
exports.jurusan = (0, pg_core_1.pgTable)("jurusan", {
    id: item.bigint({ mode: "bigint" }).primaryKey(),
    nama_jurusan: item.varchar({ length: 256 }),
});
exports.jurusanRelation = (0, drizzle_orm_1.relations)(exports.jurusan, ({ many, one }) => ({
    mahasiswa: many(mahasiswa_1.mahasiswa),
    dosen: many(dosen_1.dosen),
    mataKuliah: many(mata_kuliah_1.mataKuliah),
}));
//# sourceMappingURL=jurusan.js.map