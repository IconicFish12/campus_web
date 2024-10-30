import { Request, Response } from "express";
import { db } from "../../drizzle";
import { jurusan } from "../../drizzle/schema/jurusan";
import { jurusanValidation } from "../validation";
import { asc, eq } from "drizzle-orm";

export default class JurusanController {
  async getJurusan(req: Request, res: Response): Promise<void> {
    try {
      const dataJurusanKampus = await db
        .select()
        .from(jurusan)
        .orderBy(asc(jurusan.nama_jurusan));

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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam mengambil data",
        error: error,
      });
    }
  }

  async createJurusan(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = jurusanValidation.validate(request, {
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
        .from(jurusan)
        .where(eq(jurusan.nama_jurusan, value.nama_jurusan));

      if (exist.length === 0) {
        const createData = await db.insert(jurusan).values(value).returning();

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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }

  async updateJurusan(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = jurusanValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const existingData = await db
        .select()
        .from(jurusan)
        .where(eq(jurusan.id, parseInt(req.params.id)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Jurusan tidak ditemukan",
        });
        return;
      }

      const updatedData = await db
        .update(jurusan)
        .set(value)
        .where(eq(jurusan.id, parseInt(req.params.id)))
        .returning();

      res.status(200).json({
        message: "Data Jurusan berhasil diperbarui",
        data: updatedData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terdapat Kesalahan dalam memperbarui data",
        error: error,
      });
    }
  }

  async deleteJurusan(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(jurusan)
        .where(eq(jurusan.id, parseInt(req.params.id as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Jurusan tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(jurusan)
        .where(eq(jurusan.id, parseInt(req.params.id)))
        .returning();

      res.status(200).json({
        message: "Data Jurusan berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terdapat Kesalahan dalam menghapus data",
        error: error,
      });
    }
  }
}
