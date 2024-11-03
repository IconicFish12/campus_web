"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_1 = require("../../drizzle");
const kelas_1 = require("../../drizzle/schema/kelas");
const validation_1 = require("../validation");
const drizzle_orm_1 = require("drizzle-orm");
const jurusan_1 = require("../../drizzle/schema/jurusan");
const dosen_1 = require("../../drizzle/schema/dosen");
class KelasController {
    async getKelas(req, res) {
        try {
            const dataKelas = await drizzle_1.db
                .select()
                .from(kelas_1.kelas)
                .leftJoin(jurusan_1.jurusan, (0, drizzle_orm_1.eq)(kelas_1.kelas.jurusanId, jurusan_1.jurusan.id))
                .leftJoin(dosen_1.dosen, (0, drizzle_orm_1.eq)(kelas_1.kelas.dosenId, dosen_1.dosen.id));
            if (dataKelas.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data Kelas tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Kelas Ditemukan",
                data: dataKelas,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam mengambil data",
                error: error,
            });
        }
    }
    async createkelas(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.kelasValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            const exist = await drizzle_1.db
                .select()
                .from(kelas_1.kelas)
                .where((0, drizzle_orm_1.eq)(kelas_1.kelas.nama_kelas, value.nama_kelas));
            if (exist.length === 0) {
                const createData = await drizzle_1.db
                    .insert(kelas_1.kelas)
                    .values({
                    nama_kelas: value.nama_kelas,
                    jurusanId: value.jurusanId,
                    dosenId: value.dosenId,
                    jumlahMahasiswa: value.jumlahMahasiswa,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Kelas berhasil Dibuat",
                    data: createData,
                });
                return;
            }
            res.status(200).json({
                message: "Data Kelas Sudah tersedia",
                request: value,
            });
        }
        catch (error) {
            console.log("Kesalahan dalam membuat data Kelas :", error);
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
    async updateKelas(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.kelasValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            const exist = await drizzle_1.db
                .select()
                .from(kelas_1.kelas)
                .where((0, drizzle_orm_1.eq)(kelas_1.kelas.id, parseInt(req.params.id)));
            if (exist.length === 0) {
                res.status(200).json({
                    message: "Data Kelas tidak ditemukan",
                });
                return;
            }
            const updateData = await drizzle_1.db
                .update(kelas_1.kelas)
                .set({
                nama_kelas: value.nama_kelas,
                jurusanId: value.jurusanId,
                dosenId: value.dosenId,
                jumlahMahasiswa: value.jumlahMahasiswa,
            })
                .where((0, drizzle_orm_1.eq)(kelas_1.kelas.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Kelas berhasil Diubah",
                data: updateData,
            });
        }
        catch (error) {
            console.log("Kesalahan dalam merubah data Kelas :", error);
            res.json({
                message: "Terdapat Kesalahan dalam merubah data",
                error: error,
            });
        }
    }
    async deleteKelas(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(kelas_1.kelas)
                .where((0, drizzle_orm_1.eq)(kelas_1.kelas.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Kelas tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(kelas_1.kelas)
                .where((0, drizzle_orm_1.eq)(kelas_1.kelas.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Kelas berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting data kelas:", error); // Log the error for debugging
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
}
exports.default = KelasController;
//# sourceMappingURL=KelasController.js.map