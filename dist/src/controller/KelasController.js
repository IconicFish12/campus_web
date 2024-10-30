"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_1 = require("../../drizzle");
const kelas_1 = require("../../drizzle/schema/kelas");
const validation_1 = require("../validation");
class KelasController {
    async getKelas(req, res) {
        try {
            const dataKelas = await drizzle_1.db.select().from(kelas_1.kelas);
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
                abortEarly: false
            });
            if (error) {
                res.status(200).json({
                    message: error.details[0].message,
                    request: value,
                });
                return;
            }
            // const createData = await db.insert(kelas).values(value);
            res.json({
                message: "Data Kelas Berhasil dibuat",
                request: request,
            });
        }
        catch (error) {
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
}
exports.default = KelasController;
//# sourceMappingURL=KelasController.js.map