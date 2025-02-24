"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const drizzle_1 = require("../../drizzle");
const dosen_1 = require("../../drizzle/schema/dosen");
const mahasiswa_1 = require("../../drizzle/schema/mahasiswa");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jurusan_1 = require("../../drizzle/schema/jurusan");
const kelas_1 = require("../../drizzle/schema/kelas");
class UserController {
    async getMahasiswa(req, res) {
        try {
            const dataMahasiswa = await drizzle_1.db
                .select()
                .from(mahasiswa_1.mahasiswa)
                .leftJoin(jurusan_1.jurusan, (0, drizzle_orm_1.eq)(mahasiswa_1.mahasiswa.jurusanId, jurusan_1.jurusan.id))
                .leftJoin(kelas_1.kelas, (0, drizzle_orm_1.eq)(mahasiswa_1.mahasiswa.jurusanId, kelas_1.kelas.id));
            if (!dataMahasiswa || dataMahasiswa.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data mahasiswa tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Mahasiswa berhasil Diambil",
                data: dataMahasiswa,
            });
        }
        catch (error) {
            // Set status 500 for server error and hide sensitive information in error response
            console.error("Error fetching dataDosen:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam mengambil data.",
            });
        }
    }
    async getDosen(req, res) {
        try {
            const dataDosen = await drizzle_1.db
                .select()
                .from(dosen_1.dosen)
                .leftJoin(jurusan_1.jurusan, (0, drizzle_orm_1.eq)(dosen_1.dosen.jurusanId, jurusan_1.jurusan.id));
            // Check if dataDosen exists and has elements
            if (!dataDosen || dataDosen.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data dosen tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Dosen Berhasil Diambil",
                data: dataDosen,
            });
        }
        catch (error) {
            // Set status 500 for server error and hide sensitive information in error response
            console.error("Error fetching dataDosen:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam mengambil data.",
            });
        }
    }
    async createMahasiswa(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.mahasiswaValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            const salt = bcrypt_1.default.genSaltSync(10);
            const passwordHash = bcrypt_1.default.hashSync(value.password, salt);
            const namaDosen = value.nama_dosen;
            const inisial = namaDosen
                .split(" ")
                .map((word) => word[0])
                .join("");
            const exits = await drizzle_1.db
                .select()
                .from(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.nama_dosen, value.nama_dosen));
            if (exits.length === 0) {
                const data = await drizzle_1.db
                    .insert(dosen_1.dosen)
                    .values({
                    nip: value.nip,
                    nama_dosen: value.nama_dosen,
                    kode_dosen: inisial,
                    tempat_lahir: value.tempat_lahir,
                    jurusanId: value.jurusanId || 1,
                    tanggal_lahir: value.tanggal_lahir,
                    bidang_keahlian: value.bidang_keahlian,
                    email: value.email,
                    password: passwordHash,
                    alamat: value.alamat,
                    jenis_kelamin: value.jenis_kelamin,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Dosen Berhasil Dibuat",
                    data: data,
                });
                return;
            }
            res.status(200).json({
                message: "Data Dosen Sudah Tersedia",
                data: exits,
            });
        }
        catch (error) {
            console.error("Error creating data Dosen :", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam membuat data.",
            });
        }
    }
    async createDosen(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.dosenValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            const salt = bcrypt_1.default.genSaltSync(10);
            const passwordHash = bcrypt_1.default.hashSync(value.password, salt);
            const namaDosen = value.nama_dosen;
            const inisial = namaDosen
                .split(" ")
                .map((word) => word[0])
                .join("");
            const exits = await drizzle_1.db
                .select()
                .from(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.nama_dosen, value.nama_dosen));
            if (exits.length === 0) {
                const data = await drizzle_1.db
                    .insert(dosen_1.dosen)
                    .values({
                    nip: value.nip,
                    nama_dosen: value.nama_dosen,
                    kode_dosen: inisial,
                    tempat_lahir: value.tempat_lahir,
                    jurusanId: value.jurusanId || 1,
                    tanggal_lahir: value.tanggal_lahir,
                    bidang_keahlian: value.bidang_keahlian,
                    email: value.email,
                    password: passwordHash,
                    alamat: value.alamat,
                    jenis_kelamin: value.jenis_kelamin,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Dosen Berhasil Dibuat",
                    data: data,
                });
                return;
            }
            res.status(200).json({
                message: "Data Dosen Sudah Tersedia",
                data: exits,
            });
        }
        catch (error) {
            console.error("Error creating data Dosen :", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam membuat data.",
            });
        }
    }
    async updateMahasiswa(req, res) {
        try {
            const request = req.body;
            res.json({
                message: "Body Request",
                request: request,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Terdapat Kesalahan pada Pembuatan Data",
                error: error,
            });
        }
    }
    async updateDosen(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.dosenValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            if (request.password) {
                const salt = bcrypt_1.default.genSaltSync(10);
                const passwordHash = bcrypt_1.default.hashSync(request.password, salt);
                await drizzle_1.db
                    .update(dosen_1.dosen)
                    .set({ password: passwordHash })
                    .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)))
                    .returning();
                res.status(200).json({
                    message: "Password Berhasil Diubah",
                });
                return;
            }
            const namaDosen = request.nama_dosen;
            const inisial = namaDosen
                .split(" ")
                .map((word) => word[0])
                .join("");
            const exits = await drizzle_1.db
                .select()
                .from(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)));
            if (exits.length === 0) {
                res.status(200).json({
                    message: "Data Dosen Tidak Ditemukan",
                });
                return;
            }
            const updateData = await drizzle_1.db
                .update(dosen_1.dosen)
                .set({
                nip: request.nip || dosen_1.dosen.nip,
                nama_dosen: request.nama_dosen,
                kode_dosen: inisial,
                tempat_lahir: request.tempat_lahir,
                tanggal_lahir: request.tanggal_lahir,
                alamat: request.alamat,
                jenis_kelamin: request.jenis_kelamin,
                bidang_keahlian: request.bidang_keahlian,
                email: request.email,
                jurusanId: request.jurusanId,
            })
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Dosen Berhasil Diubah",
                data: updateData,
            });
        }
        catch (error) {
            console.error("Error updating dataDosen:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam merubah data.",
            });
        }
    }
    async deleteDosen(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Dosen tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Jurusan berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting dataDosen:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
    async deleteMahasiswa(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(mahasiswa_1.mahasiswa)
                .where((0, drizzle_orm_1.eq)(dosen_1.dosen.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Mahasiswa tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(dosen_1.dosen)
                .where((0, drizzle_orm_1.eq)(mahasiswa_1.mahasiswa.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Mahasiswa berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting data mahasiswa:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map