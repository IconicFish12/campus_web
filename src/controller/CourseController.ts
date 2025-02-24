import { Request, Response } from "express";
import BaseController from "./BaseController";
import { db } from "../../drizzle";
import { mataKuliah } from "../../drizzle/schema/mata_kuliah";
import { jurusan } from "../../drizzle/schema/jurusan";
import { eq } from "drizzle-orm";
import { dosen } from "../../drizzle/schema/dosen";
import { MatKulValidation } from "../../src/validation";

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
}
