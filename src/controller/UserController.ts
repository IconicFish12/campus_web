import { db } from "../../drizzle";
import { dosen } from "../../drizzle/schema/dosen";
import { mahasiswa } from "../../drizzle/schema/mahasiswa";
import { Request, Response } from "express";

export default class UserController {
  async getMahasiswa(req: Request, res: Response): Promise<void> {
    try {
      const dataMahasiswa = await db.select().from(mahasiswa);
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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam mengambil data",
        error: error,
      });
    }
  }

  async getDosen(req: Request, res: Response): Promise<void> {
    try {
      const dataDosen = await db.select().from(dosen);
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
    } catch (error) {
      res.json({
        message: "Terdapat Kesalahan dalam mengambil data",
        error: error,
      });
    }
  }

  async createDataMahasiswa(req: Request, res: Response): Promise<void> {
    const request = req.body;

    res.json({
      message: "Body Request",
      request: request,
    });
  }
}
