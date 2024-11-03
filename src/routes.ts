import express from "express";
import BaseController from "../src/controller/BaseController";
import UserController from "../src/controller/UserController";
import JurusanController from "../src/controller/JurusanController";
import KelasController from "../src/controller/KelasController";

const base = new BaseController();
const user = new UserController();
const jurusan = new JurusanController();
const kelas = new KelasController();
const routes = express.Router();

// Index Route
routes.get("/", base.index);

// ========== User Routes ===========

// Mahasiswa Routes
routes.get("/user/getMahasiswa", user.getMahasiswa);
routes.post("/user/createMahasiswa", user.createMahasiswa);
routes.put("/data/updateMahasiswa/:id", user.updateMahasiswa);
routes.delete("/data/deleteMahsiswa/:id", user.deleteMahasiswa);

// Dosen Routes
routes.get("/user/getDosen", user.getDosen);
routes.post("/user/createDosen", user.createDosen);
routes.put("/user/updateDosen/:id", user.updateDosen);
routes.delete("/user/deleteDosen/:id", user.deleteDosen)

// ========== Data Kampus Routes ============

// Jurusan Kampus Routes
routes.get("/data/getJurusan", jurusan.getJurusan);
routes.post("/data/createJurusan", jurusan.createJurusan);
routes.put("/data/updateJurusan/:id", jurusan.updateJurusan);
routes.delete("/data/deleteJurusan/:id", jurusan.deleteJurusan);

// Kelas Kampus Routes
routes.get("/data/getKelas", kelas.getKelas);
routes.post("/data/createKelas", kelas.createkelas);
routes.put("/data/updateKelas/:id", kelas.updateKelas);
routes.delete("/data/deleteKelas/:id", kelas.deleteKelas);

export default routes;
