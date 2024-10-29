"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_1 = require("../../drizzle");
const dosen_1 = require("../../drizzle/schema/dosen");
const mahasiswa_1 = require("../../drizzle/schema/mahasiswa");
class UserController {
    // constructor() {
    //   this.getMahasiswa = this.getMahasiswa.bind(this);
    //   this.getDosen = this.getDosen.bind(this);
    // }
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
            console.error("Error fetching mahasiswa:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching data",
            });
        }
    }
    async getDosen(req, res) {
        try {
            const dataDosen = await drizzle_1.db.select().from(dosen_1.dosen);
            if (dataDosen.length === 0) {
                res.status(404).json({
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
            console.error("Error fetching dosen:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching data",
            });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map