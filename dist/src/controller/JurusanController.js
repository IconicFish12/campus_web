"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_1 = require("../../drizzle");
const jurusan_1 = require("../../drizzle/schema/jurusan");
const validation_1 = require("../validation");
const drizzle_orm_1 = require("drizzle-orm");
class JurusanController {
    async getJurusan(req, res) {
        try {
            const dataJurusanKampus = await drizzle_1.db
                .select()
                .from(jurusan_1.jurusan)
                .orderBy((0, drizzle_orm_1.asc)(jurusan_1.jurusan.nama_jurusan));
            if (dataJurusanKampus.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data Jurusan tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                massage: "Data Jurusan Ditemukan",
                data: dataJurusanKampus,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam mengambil data",
                error: error,
            });
        }
    }
    async createJurusan(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.jurusanValidation.validate(request, {
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
                .from(jurusan_1.jurusan)
                .where((0, drizzle_orm_1.eq)(jurusan_1.jurusan.nama_jurusan, value.nama_jurusan));
            if (exist.length === 0) {
                const createData = await drizzle_1.db.insert(jurusan_1.jurusan).values(value).returning();
                res.json({
                    message: "Data Kelas Berhasil dibuat",
                    request: createData,
                });
                return;
            }
            res.status(200).json({
                message: "Nama Jurusan yang dimasukan Sudah tersedia",
                request: value.nama_jurusan,
                data: exist,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
    async updateJurusan(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.jurusanValidation.validate(request, {
                abortEarly: false,
            });
            if (error) {
                res.status(400).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            const existingData = await drizzle_1.db
                .select()
                .from(jurusan_1.jurusan)
                .where((0, drizzle_orm_1.eq)(jurusan_1.jurusan.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Jurusan tidak ditemukan",
                });
                return;
            }
            const updatedData = await drizzle_1.db
                .update(jurusan_1.jurusan)
                .set(value)
                .where((0, drizzle_orm_1.eq)(jurusan_1.jurusan.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Jurusan berhasil diperbarui",
                data: updatedData,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Terdapat Kesalahan dalam memperbarui data",
                error: error,
            });
        }
    }
    async deleteJurusan(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(jurusan_1.jurusan)
                .where((0, drizzle_orm_1.eq)(jurusan_1.jurusan.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Jurusan tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(jurusan_1.jurusan)
                .where((0, drizzle_orm_1.eq)(jurusan_1.jurusan.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Jurusan berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Terdapat Kesalahan dalam menghapus data",
                error: error,
            });
        }
    }
}
exports.default = JurusanController;
//# sourceMappingURL=JurusanController.js.map