import { db } from "../../drizzle";
import { dosen } from "../../drizzle/schema/dosen";
import { mahasiswa } from "../../drizzle/schema/mahasiswa";
import { Request, Response } from "express";

export default class UserController {
  // constructor() {
  //   this.getMahasiswa = this.getMahasiswa.bind(this);
  //   this.getDosen = this.getDosen.bind(this);
  // }

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
      console.error("Error fetching mahasiswa:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching data",
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
      console.error("Error fetching dosen:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching data",
      });
    }
  }
}
