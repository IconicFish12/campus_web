"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kelasValidation = exports.jurusanValidation = exports.dosenValidatio = exports.mahasiswaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.mahasiswaValidation = joi_1.default
    .object({
    nim: joi_1.default.number().max(13).min(12).required(),
    nama_mahasiswa: joi_1.default.string().required(),
    tempat_lahir: joi_1.default.string().required(),
    tanggal_lahir: joi_1.default.date().required(),
    alamat: joi_1.default.string().required(),
    email: joi_1.default.string().email(),
    username: joi_1.default.string().min(4).max(12).required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})
    .required();
exports.dosenValidatio = joi_1.default
    .object({
    nip: joi_1.default.number().max(13).min(12).required(),
    kode_dosen: joi_1.default.number().max(3).required(),
    nama_dosen: joi_1.default.string().required(),
    tempat_lahir: joi_1.default.string().required(),
    tanggal_lahir: joi_1.default.date().required(),
    bidang_keahlian: joi_1.default.string().required(),
    alamat: joi_1.default.string().required(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})
    .required();
exports.jurusanValidation = joi_1.default
    .object({
    nama_jurusan: joi_1.default.string().required(),
})
    .required();
exports.kelasValidation = joi_1.default
    .object({
    nama_kelas: joi_1.default.string().alphanum().required(),
})
    .required();
//# sourceMappingURL=validation.js.map