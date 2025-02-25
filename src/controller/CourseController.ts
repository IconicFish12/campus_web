import { Request, Response } from "express";
import BaseController from "./BaseController";
import { db } from "../../drizzle";
import { mataKuliah } from "../../drizzle/schema/mata_kuliah";
import { jurusan } from "../../drizzle/schema/jurusan";
import { eq } from "drizzle-orm";
import { dosen } from "../../drizzle/schema/dosen";
import { MatKulValidation, NilaiInputValidation, tugasInputValidation } from "../../src/validation";
import { tugas_mahasiswa } from "../../drizzle/schema/tugas_mahasiswa";
import { nilai } from "../../drizzle/schema/nilai";

export default class CourseController extends BaseController {
  async getData(req: Request, res: Response): Promise<void> {
    try {
      const dataMataKuliah = await db
        .select()
        .from(mataKuliah)
        .leftJoin(jurusan, eq(mataKuliah.jurusanId, jurusan.id))
        .leftJoin(dosen, eq(mataKuliah.dosenId, dosen.id));

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
    } catch (error) {}
  }

  async createData(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = MatKulValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(mataKuliah)
        .where(eq(mataKuliah.nama_matkul, value.nama_matkul));

      if (exist.length === 0) {
        const createData = await db
          .insert(mataKuliah)
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
    } catch (error) {
      console.log("Kesalahan dalam membuat data Mata Kuliah :", error);
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }

  async updateData(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = MatKulValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(mataKuliah)
        .where(eq(mataKuliah.id, parseInt(req.params.id as string)));

      if (exist.length === 0) {
        res.status(200).json({
          message: "Data Kelas tidak ditemukan",
        });
        return;
      }
      const updateData = await db
        .update(mataKuliah)
        .set({
          nama_matkul: value.nama_matkul,
          jurusanId: value.jurusanId,
          dosenId: value.dosenId,
          kelasId: value.kelasId,
        })
        .where(eq(mataKuliah.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Kelas berhasil Diubah",
        data: updateData,
      });
    } catch (error) {
      console.log("Kesalahan dalam merubah data Kelas :", error);
      res.json({
        message: "Terdapat Kesalahan dalam merubah data",
        error: error,
      });
    }
  }

  async deleteData(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(mataKuliah)
        .where(eq(mataKuliah.id, parseInt(req.params.id as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data mata kuliah tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(mataKuliah)
        .where(eq(mataKuliah.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data mata kuliah berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting data mata kuliah:", error);
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }

  async getDataTugas(req: Request, res: Response): Promise<void> {
    try {
      const dataTugas = await db
        .select()
        .from(tugas_mahasiswa)
        .leftJoin(mataKuliah, eq(tugas_mahasiswa.mataKuliahId, mataKuliah.id));

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
    } catch (error) {}
  }

  async createDataTugas(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = tugasInputValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(tugas_mahasiswa)
        .where(eq(tugas_mahasiswa.nama_tugas, value.nama_tugas));

      if (exist.length === 0) {
        const createData = await db
          .insert(tugas_mahasiswa)
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
    } catch (error) {
      console.log("Kesalahan dalam membuat data tugas mahasiswa :", error);
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }

  async updateDataTugas(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = tugasInputValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(tugas_mahasiswa)
        .where(eq(tugas_mahasiswa.id, parseInt(req.params.id as string)));

      if (exist.length === 0) {
        res.status(200).json({
          message: "Data Kelas tidak ditemukan",
        });
        return;
      }
      const updateData = await db
        .update(tugas_mahasiswa)
        .set({
          nama_tugas: value.nama_tugas,
          mataKuliahId: value.mataKuliahId,
          desc: value.desc,
          deadline: value.deadline,
        })
        .where(eq(tugas_mahasiswa.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Kelas berhasil Diubah",
        data: updateData,
      });
    } catch (error) {
      console.log("Kesalahan dalam merubah data Kelas :", error);
      res.json({
        message: "Terdapat Kesalahan dalam merubah data",
        error: error,
      });
    }
  }

  async deleteDataTugas(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(tugas_mahasiswa)
        .where(eq(tugas_mahasiswa.id, parseInt(req.params.id as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "data tugas mahasiswa tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(tugas_mahasiswa)
        .where(eq(tugas_mahasiswa.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "data tugas mahasiswa berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting data tugas mahasiswa:", error);
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }

  async getDataNilai(req: Request, res: Response): Promise<void> {
    try {
      const dataNilaiMatKul = await db
        .select()
        .from(nilai)
        .leftJoin(tugas_mahasiswa, eq(nilai.tugasMahasiswaId, tugas_mahasiswa.id))

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
    } catch (error) {}
  }

  async createDataNilai(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = NilaiInputValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(nilai)
        .where(eq(nilai.nilai, value.nilai));

      if (exist.length === 0) {
        const createData = await db
          .insert(nilai)
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
    } catch (error) {
      console.log("Kesalahan dalam membuat Data Nilai :", error);
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }

  async updateDataNilai(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = NilaiInputValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const exist = await db
        .select()
        .from(nilai)
        .where(eq(nilai.id, parseInt(req.params.id as string)));

      if (exist.length === 0) {
        res.status(200).json({
          message: "Data Nilai tidak ditemukan",
        });
        return;
      }
      const updateData = await db
        .update(nilai)
        .set({
          nilai: value.nilai,
            tugasMahasiswaId: value.tugasMahasiswaId,
            comment: value.comment,
        })
        .where(eq(nilai.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Kelas berhasil Diubah",
        data: updateData,
      });
    } catch (error) {
      console.log("Kesalahan dalam merubah data Kelas :", error);
      res.json({
        message: "Terdapat Kesalahan dalam merubah data",
        error: error,
      });
    }
  }

  async deleteDataNilai(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(nilai)
        .where(eq(nilai.id, parseInt(req.params.id as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Nilai tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(nilai)
        .where(eq(nilai.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Nilai berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting Data Nilai:", error);
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }
}
