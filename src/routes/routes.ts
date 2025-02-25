import express from "express";
import UserController from "../controller/UserController";
import JurusanController from "../controller/JurusanController";
import KelasController from "../controller/KelasController";
import AuthController from "../controller/AuthController";
import CourseController from "../controller/CourseController";

// const base = new BaseController();
const course = new CourseController();
const user = new UserController();
const jurusan = new JurusanController();
const kelas = new KelasController();
const routes = express.Router();
const auth = new AuthController();

// Index Route
// routes.get("/", base.index);

// ========== AUth Routes ===========

routes.get("/auth/login", auth.login);
routes.get("/auth/register", auth.login);

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
routes.delete("/user/deleteDosen/:id", user.deleteDosen);

// ========== Data Kampus Routes ============

// Jurusan Kampus Routes
routes.get("/data/getJurusan", jurusan.getData);
routes.post("/data/createJurusan", jurusan.createData);
routes.put("/data/updateJurusan/:id", jurusan.updateData);
routes.delete("/data/deleteJurusan/:id", jurusan.deleteData);

// Kelas Kampus Routes
routes.get("/data/getKelas", kelas.getData);
routes.post("/data/createKelas", kelas.createData);
routes.put("/data/updateKelas/:id", kelas.updateData);
routes.delete("/data/deleteKelas/:id", kelas.deleteData);

// Mata kuliah
routes.get("/data/getCourse", course.getData);
routes.post("/data/createCourse", course.createData);
routes.put("/data/updateCourse/:id", course.updateData);
routes.delete("/data/deleteCourse/:id", course.deleteData);

// Tugas Matakuliah dan nilai Tugas
routes.get("/data/getTugas", course.getDataTugas);
routes.post("/data/createTugas", course.createDataTugas);
routes.put("/data/updateTugas/:id", course.updateDataTugas);
routes.delete("/data/deleteTugas/:id", course.deleteDataTugas);

routes.get("/data/getNilai", course.getDataNilai);
routes.post("/data/createNilai", course.createDataNilai);
routes.put("/data/updateNilai/:id", course.updateDataNilai);
routes.delete("/data/deleteNilai/:id", course.deleteDataNilai);

export default routes;
