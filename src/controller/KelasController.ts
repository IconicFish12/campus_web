import { Request, Response } from "express";
import { db } from "../../drizzle";
import { kelas } from "../../drizzle/schema/kelas";
import { kelasValidation } from "../validation";

export default class KelasController {
  async getKelas(req: Request, res: Response): Promise<void> {
    try {
      const dataKelas = await db.select().from(kelas);

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
        abortEarly : false
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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam membuat data",
        error: error,
      });
    }
  }
}
