"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kelasValidation = exports.jurusanValidation = exports.dosenValidation = exports.mahasiswaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.mahasiswaValidation = joi_1.default
    .object({
    nim: joi_1.default.number().min(4).required(),
    nama_mahasiswa: joi_1.default.string().required(),
    tempat_lahir: joi_1.default.string().required(),
    tanggal_lahir: joi_1.default.date().required(),
    jurusanId: joi_1.default.number(),
    kelasId: joi_1.default.number(),
    alamat: joi_1.default.string().max(100),
    email: joi_1.default.string().email(),
    username: joi_1.default.string().min(4).max(12).required(),
    password: joi_1.default
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .max(15),
    jenis_kelamin: joi_1.default.string(),
})
    .required();
exports.dosenValidation = joi_1.default
    .object({
    nip: joi_1.default.number().min(4).required(),
    nama_dosen: joi_1.default.string().required(),
    tempat_lahir: joi_1.default.string().required(),
    tanggal_lahir: joi_1.default.date().required(),
    bidang_keahlian: joi_1.default.string().required(),
    jurusanId: joi_1.default.number(),
    alamat: joi_1.default.string().max(100),
    email: joi_1.default.string().email().required(),
    password: joi_1.default
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .max(15),
    jenis_kelamin: joi_1.default.string(),
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
    jurusanId: joi_1.default.number(),
    dosenId: joi_1.default.number(),
    jumlahMahasiswa: joi_1.default.number().required(),
})
    .required();
//# sourceMappingURL=validation.js.map