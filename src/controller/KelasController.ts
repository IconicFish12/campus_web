import { Request, Response } from "express";
import { db } from "../../drizzle";
import { kelas } from "../../drizzle/schema/kelas";
import { kelasValidation } from "../validation";
import { eq } from "drizzle-orm";
import { jurusan } from "../../drizzle/schema/jurusan";
import { dosen } from "../../drizzle/schema/dosen";

export default class KelasController {
  async getKelas(req: Request, res: Response): Promise<void> {
    try {
      const dataKelas = await db
        .select()
        .from(kelas)
        .leftJoin(jurusan, eq(kelas.jurusanId, jurusan.id))
        .leftJoin(dosen, eq(kelas.dosenId, dosen.id));

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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam mengambil data",
        error: error,
      });
    }
  }

  async createkelas(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = kelasValidation.validate(request, {
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
        .from(kelas)
        .where(eq(kelas.nama_kelas, value.nama_kelas));

      if (exist.length === 0) {
        const createData = await db
          .insert(kelas)
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
    } catch (error) {
      console.log("Kesalahan dalam membuat data Kelas :", error);
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }

  async updateKelas(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = kelasValidation.validate(request, {
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
        .from(kelas)
        .where(eq(kelas.id, parseInt(req.params.id as string)));

      if (exist.length === 0) {
        res.status(200).json({
          message: "Data Kelas tidak ditemukan",
        });
        return;
      }
      const updateData = await db
        .update(kelas)
        .set({
          nama_kelas: value.nama_kelas,
          jurusanId: value.jurusanId,
          dosenId: value.dosenId,
          jumlahMahasiswa: value.jumlahMahasiswa,
        })
        .where(eq(kelas.id, parseInt(req.params.id as string)))
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

  async deleteKelas(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(kelas)
        .where(eq(kelas.id, parseInt(req.params.id as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Kelas tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(kelas)
        .where(eq(kelas.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Kelas berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting data kelas:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }
}
