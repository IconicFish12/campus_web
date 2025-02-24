import { dosenValidation, mahasiswaValidation } from "../validation";
import { db } from "../../drizzle";
import { dosen } from "../../drizzle/schema/dosen";
import { mahasiswa } from "../../drizzle/schema/mahasiswa";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { jurusan } from "../../drizzle/schema/jurusan";
import { kelas } from "../../drizzle/schema/kelas";

export default class UserController {
  async getMahasiswa(req: Request, res: Response): Promise<void> {
    try {
      const dataMahasiswa = await db
        .select()
        .from(mahasiswa)
        .leftJoin(jurusan, eq(mahasiswa.jurusanId, jurusan.id))
        .leftJoin(kelas, eq(mahasiswa.jurusanId, kelas.id));

      if (!dataMahasiswa || dataMahasiswa.length === 0) {
        res.status(200).json({
          success: false,
          message: "Data mahasiswa tidak ditemukan.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Data Mahasiswa berhasil Diambil",
        data: dataMahasiswa,
      });
    } catch (error) {
      // Set status 500 for server error and hide sensitive information in error response
      console.error("Error fetching dataDosen:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam mengambil data.",
      });
    }
  }

  async getDosen(req: Request, res: Response): Promise<void> {
    try {
      const dataDosen = await db
        .select()
        .from(dosen)
        .leftJoin(jurusan, eq(dosen.jurusanId, jurusan.id));

      // Check if dataDosen exists and has elements
      if (!dataDosen || dataDosen.length === 0) {
        res.status(200).json({
          success: false,
          message: "Data dosen tidak ditemukan.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Data Dosen Berhasil Diambil",
        data: dataDosen,
      });
    } catch (error) {
      // Set status 500 for server error and hide sensitive information in error response
      console.error("Error fetching dataDosen:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam mengambil data.",
      });
    }
  }

  async createMahasiswa(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = mahasiswaValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(value.password, salt);
      const namaDosen: string = value.nama_dosen;

      const inisial: string = namaDosen
        .split(" ")
        .map((word: string) => word[0])
        .join("");

      const exits = await db
        .select()
        .from(dosen)
        .where(eq(dosen.nama_dosen, value.nama_dosen));

      if (exits.length === 0) {
        const data = await db
          .insert(dosen)
          .values({
            nip: value.nip,
            nama_dosen: value.nama_dosen,
            kode_dosen: inisial,
            tempat_lahir: value.tempat_lahir,
            jurusanId: value.jurusanId || 1,
            tanggal_lahir: value.tanggal_lahir,
            bidang_keahlian: value.bidang_keahlian,
            email: value.email,
            password: passwordHash,
            alamat: value.alamat,
            jenis_kelamin: value.jenis_kelamin,
          })
          .returning();

        res.status(200).json({
          message: "Data Dosen Berhasil Dibuat",
          data: data,
        });
        return;
      }

      res.status(200).json({
        message: "Data Dosen Sudah Tersedia",
        data: exits,
      });
    } catch (error) {
      console.error("Error creating data Dosen :", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam membuat data.",
      });
    }
  }

  async createDosen(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = dosenValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(value.password, salt);
      const namaDosen: string = value.nama_dosen;

      const inisial: string = namaDosen
        .split(" ")
        .map((word: string) => word[0])
        .join("");

      const exits = await db
        .select()
        .from(dosen)
        .where(eq(dosen.nama_dosen, value.nama_dosen));

      if (exits.length === 0) {
        const data = await db
          .insert(dosen)
          .values({
            nip: value.nip,
            nama_dosen: value.nama_dosen,
            kode_dosen: inisial,
            tempat_lahir: value.tempat_lahir,
            jurusanId: value.jurusanId || 1,
            tanggal_lahir: value.tanggal_lahir,
            bidang_keahlian: value.bidang_keahlian,
            email: value.email,
            password: passwordHash,
            alamat: value.alamat,
            jenis_kelamin: value.jenis_kelamin,
          })
          .returning();

        res.status(200).json({
          message: "Data Dosen Berhasil Dibuat",
          data: data,
        });
        return;
      }

      res.status(200).json({
        message: "Data Dosen Sudah Tersedia",
        data: exits,
      });
    } catch (error) {
      console.error("Error creating data Dosen :", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam membuat data.",
      });
    }
  }

  async updateMahasiswa(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      res.json({
        message: "Body Request",
        request: request,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terdapat Kesalahan pada Pembuatan Data",
        error: error,
      });
    }
  }

  async updateDosen(req: Request, res: Response): Promise<void> {
    try {
      const request = req.body;

      const { error, value } = dosenValidation.validate(request, {
        abortEarly: false,
      });

      if (error) {
        res.status(200).json({
          message: error.details[0].message,
          request: value,
        });
        return;
      }

      if (request.password) {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(request.password, salt);

        await db
          .update(dosen)
          .set({ password: passwordHash })
          .where(eq(dosen.id, parseInt(req.params.id)))
          .returning();

        res.status(200).json({
          message: "Password Berhasil Diubah",
        });
        return;
      }

      const namaDosen: string = request.nama_dosen;

      const inisial: string = namaDosen
        .split(" ")
        .map((word: string) => word[0])
        .join("");

      const exits = await db
        .select()
        .from(dosen)
        .where(eq(dosen.id, parseInt(req.params.id as string)));

      if (exits.length === 0) {
        res.status(200).json({
          message: "Data Dosen Tidak Ditemukan",
        });

        return;
      }

      const updateData = await db
        .update(dosen)
        .set({
          nip: request.nip || dosen.nip,
          nama_dosen: request.nama_dosen,
          kode_dosen: inisial,
          tempat_lahir: request.tempat_lahir,
          tanggal_lahir: request.tanggal_lahir,
          alamat: request.alamat,
          jenis_kelamin: request.jenis_kelamin,
          bidang_keahlian: request.bidang_keahlian,
          email: request.email,
          jurusanId: request.jurusanId,
        })
        .where(eq(dosen.id, parseInt(req.params.id as string)))
        .returning();

      res.status(200).json({
        message: "Data Dosen Berhasil Diubah",
        data: updateData,
      });
    } catch (error) {
      console.error("Error updating dataDosen:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam merubah data.",
      });
    }
  }

  async deleteDosen(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(dosen)
        .where(eq(dosen.id, parseInt(req.params.id as string as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Dosen tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(dosen)
        .where(eq(dosen.id, parseInt(req.params.id)))
        .returning();

      res.status(200).json({
        message: "Data Jurusan berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting dataDosen:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }

  async deleteMahasiswa(req: Request, res: Response): Promise<void> {
    try {
      const existingData = await db
        .select()
        .from(mahasiswa)
        .where(eq(dosen.id, parseInt(req.params.id as string as string)));

      if (existingData.length === 0) {
        res.status(404).json({
          message: "Data Mahasiswa tidak ditemukan",
        });
        return;
      }

      const deletedData = await db
        .delete(dosen)
        .where(eq(mahasiswa.id, parseInt(req.params.id)))
        .returning();

      res.status(200).json({
        message: "Data Mahasiswa berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      console.error("Error deleting data mahasiswa:", error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Terdapat Kesalahan dalam menghapus data.",
      });
    }
  }
}
