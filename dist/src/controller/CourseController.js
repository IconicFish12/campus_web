"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
const drizzle_1 = require("../../drizzle");
const mata_kuliah_1 = require("../../drizzle/schema/mata_kuliah");
const jurusan_1 = require("../../drizzle/schema/jurusan");
const drizzle_orm_1 = require("drizzle-orm");
const dosen_1 = require("../../drizzle/schema/dosen");
const validation_1 = require("../../src/validation");
const tugas_mahasiswa_1 = require("../../drizzle/schema/tugas_mahasiswa");
const nilai_1 = require("../../drizzle/schema/nilai");
class CourseController extends BaseController_1.default {
    async getData(req, res) {
        try {
            const dataMataKuliah = await drizzle_1.db
                .select()
                .from(mata_kuliah_1.mataKuliah)
                .leftJoin(jurusan_1.jurusan, (0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.jurusanId, jurusan_1.jurusan.id))
                .leftJoin(dosen_1.dosen, (0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.dosenId, dosen_1.dosen.id));
            if (dataMataKuliah.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data Mata Kuliah  tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Mata Kuliah Ditemukan",
                data: dataMataKuliah,
            });
        }
        catch (error) { }
    }
    async createData(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.MatKulValidation.validate(request, {
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
                .from(mata_kuliah_1.mataKuliah)
                .where((0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.nama_matkul, value.nama_matkul));
            if (exist.length === 0) {
                const createData = await drizzle_1.db
                    .insert(mata_kuliah_1.mataKuliah)
                    .values({
                    nama_matkul: value.nama_matkul,
                    jurusanId: value.jurusanId,
                    dosenId: value.dosenId,
                    kelasId: value.kelasId,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Mata Kuliah berhasil Dibuat",
                    data: createData,
                });
                return;
            }
            res.status(200).json({
                message: "Data Mata Kuliah Sudah tersedia",
                request: value,
            });
        }
        catch (error) {
            console.log("Kesalahan dalam membuat data Mata Kuliah :", error);
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
    async updateData(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.MatKulValidation.validate(request, {
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
                .from(mata_kuliah_1.mataKuliah)
                .where((0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.id, parseInt(req.params.id)));
            if (exist.length === 0) {
                res.status(200).json({
                    message: "Data Kelas tidak ditemukan",
                });
                return;
            }
            const updateData = await drizzle_1.db
                .update(mata_kuliah_1.mataKuliah)
                .set({
                nama_matkul: value.nama_matkul,
                jurusanId: value.jurusanId,
                dosenId: value.dosenId,
                kelasId: value.kelasId,
            })
                .where((0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.id, parseInt(req.params.id)))
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
    async deleteData(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(mata_kuliah_1.mataKuliah)
                .where((0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data mata kuliah tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(mata_kuliah_1.mataKuliah)
                .where((0, drizzle_orm_1.eq)(mata_kuliah_1.mataKuliah.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data mata kuliah berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting data mata kuliah:", error);
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
    async getDataTugas(req, res) {
        try {
            const dataTugas = await drizzle_1.db
                .select()
                .from(tugas_mahasiswa_1.tugas_mahasiswa)
                .leftJoin(mata_kuliah_1.mataKuliah, (0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.mataKuliahId, mata_kuliah_1.mataKuliah.id));
            if (dataTugas.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data Tugas Mahasiswa  tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Tugas Mahasiswa Ditemukan",
                data: dataTugas,
            });
        }
        catch (error) { }
    }
    async createDataTugas(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.tugasInputValidation.validate(request, {
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
                .from(tugas_mahasiswa_1.tugas_mahasiswa)
                .where((0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.nama_tugas, value.nama_tugas));
            if (exist.length === 0) {
                const createData = await drizzle_1.db
                    .insert(tugas_mahasiswa_1.tugas_mahasiswa)
                    .values({
                    nama_tugas: value.nama_tugas,
                    mataKuliahId: value.mataKuliahId,
                    desc: value.desc,
                    deadline: value.deadline,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Tugas berhasil Dibuat",
                    data: createData,
                });
                return;
            }
            res.status(200).json({
                message: "data tugas mahasiswa Sudah tersedia",
                request: value,
            });
        }
        catch (error) {
            console.log("Kesalahan dalam membuat data tugas mahasiswa :", error);
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
    async updateDataTugas(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.tugasInputValidation.validate(request, {
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
                .from(tugas_mahasiswa_1.tugas_mahasiswa)
                .where((0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.id, parseInt(req.params.id)));
            if (exist.length === 0) {
                res.status(200).json({
                    message: "Data Kelas tidak ditemukan",
                });
                return;
            }
            const updateData = await drizzle_1.db
                .update(tugas_mahasiswa_1.tugas_mahasiswa)
                .set({
                nama_tugas: value.nama_tugas,
                mataKuliahId: value.mataKuliahId,
                desc: value.desc,
                deadline: value.deadline,
            })
                .where((0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.id, parseInt(req.params.id)))
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
    async deleteDataTugas(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(tugas_mahasiswa_1.tugas_mahasiswa)
                .where((0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "data tugas mahasiswa tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(tugas_mahasiswa_1.tugas_mahasiswa)
                .where((0, drizzle_orm_1.eq)(tugas_mahasiswa_1.tugas_mahasiswa.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "data tugas mahasiswa berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting data tugas mahasiswa:", error);
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
    async getDataNilai(req, res) {
        try {
            const dataNilaiMatKul = await drizzle_1.db
                .select()
                .from(nilai_1.nilai)
                .leftJoin(tugas_mahasiswa_1.tugas_mahasiswa, (0, drizzle_orm_1.eq)(nilai_1.nilai.tugasMahasiswaId, tugas_mahasiswa_1.tugas_mahasiswa.id));
            if (dataNilaiMatKul.length === 0) {
                res.status(200).json({
                    success: false,
                    message: "Data Nilai  tidak ditemukan.",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Data Nilai Ditemukan",
                data: dataNilaiMatKul,
            });
        }
        catch (error) { }
    }
    async createDataNilai(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.NilaiInputValidation.validate(request, {
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
                .from(nilai_1.nilai)
                .where((0, drizzle_orm_1.eq)(nilai_1.nilai.nilai, value.nilai));
            if (exist.length === 0) {
                const createData = await drizzle_1.db
                    .insert(nilai_1.nilai)
                    .values({
                    nilai: value.nilai,
                    tugasMahasiswaId: value.tugasMahasiswaId,
                    comment: value.comment,
                })
                    .returning();
                res.status(200).json({
                    message: "Data Nilai berhasil Dibuat",
                    data: createData,
                });
                return;
            }
            res.status(200).json({
                message: "Data Nilai Sudah tersedia",
                request: value,
            });
        }
        catch (error) {
            console.log("Kesalahan dalam membuat Data Nilai :", error);
            res.json({
                message: "Terdapat Kesalahan dalam membuat data",
                error: error,
            });
        }
    }
    async updateDataNilai(req, res) {
        try {
            const request = req.body;
            const { error, value } = validation_1.NilaiInputValidation.validate(request, {
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
                .from(nilai_1.nilai)
                .where((0, drizzle_orm_1.eq)(nilai_1.nilai.id, parseInt(req.params.id)));
            if (exist.length === 0) {
                res.status(200).json({
                    message: "Data Nilai tidak ditemukan",
                });
                return;
            }
            const updateData = await drizzle_1.db
                .update(nilai_1.nilai)
                .set({
                nilai: value.nilai,
                tugasMahasiswaId: value.tugasMahasiswaId,
                comment: value.comment,
            })
                .where((0, drizzle_orm_1.eq)(nilai_1.nilai.id, parseInt(req.params.id)))
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
    async deleteDataNilai(req, res) {
        try {
            const existingData = await drizzle_1.db
                .select()
                .from(nilai_1.nilai)
                .where((0, drizzle_orm_1.eq)(nilai_1.nilai.id, parseInt(req.params.id)));
            if (existingData.length === 0) {
                res.status(404).json({
                    message: "Data Nilai tidak ditemukan",
                });
                return;
            }
            const deletedData = await drizzle_1.db
                .delete(nilai_1.nilai)
                .where((0, drizzle_orm_1.eq)(nilai_1.nilai.id, parseInt(req.params.id)))
                .returning();
            res.status(200).json({
                message: "Data Nilai berhasil dihapus",
                data: deletedData,
            });
        }
        catch (error) {
            console.error("Error deleting Data Nilai:", error);
            res.status(500).json({
                success: false,
                message: "Terdapat Kesalahan dalam menghapus data.",
            });
        }
    }
}
exports.default = CourseController;
//# sourceMappingURL=CourseController.js.map