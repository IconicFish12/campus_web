"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_1 = require("../../drizzle");
const dosen_1 = require("../../drizzle/schema/dosen");
const mahasiswa_1 = require("../../drizzle/schema/mahasiswa");
class UserController {
    async getMahasiswa(req, res) {
        try {
            const dataMahasiswa = await drizzle_1.db.select().from(mahasiswa_1.mahasiswa);
            if (dataMahasiswa.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data mahasiswa tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data berhasil di-fetch",
                data: dataMahasiswa,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam mengambil data",
                error: error,
            });
        }
    }
    async getDosen(req, res) {
        try {
            const dataDosen = await drizzle_1.db.select().from(dosen_1.dosen);
            if (dataDosen.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data dosen tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data berhasil di-fetch",
                data: dataDosen,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam mengambil data",
                error: error,
            });
        }
    }
    async createDataMahasiswa(req, res) {
        const request = req.body;
        res.json({
            message: "Body Request",
            request: request,
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map