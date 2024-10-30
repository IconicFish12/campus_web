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
routes.post("/user/createMahasiswa", user.createDataMahasiswa);

// Dosen Routes
routes.get("/user/getDosen", user.getDosen);

// ========== Data Kampus Routes ============

// Jurusan Kampus Routes
routes.get("/data/getJurusan", jurusan.getJurusan);
routes.post("/data/createJurusan", jurusan.createJurusan);
routes.put("/data/updateJurusan/:id", jurusan.updateJurusan);
routes.delete("/data/deleteJurusan/:id", jurusan.deleteJurusan);


// Kelas Kampus Routes
routes.get("/data/getKelas", kelas.getKelas);
routes.post("/data/createKelas", kelas.createkelas);

export default routes;
