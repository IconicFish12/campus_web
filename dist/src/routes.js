"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../src/controller/UserController"));
const JurusanController_1 = __importDefault(require("../src/controller/JurusanController"));
const KelasController_1 = __importDefault(require("../src/controller/KelasController"));
const AuthController_1 = __importDefault(require("./controller/AuthController"));
const CourseController_1 = __importDefault(require("./controller/CourseController"));
// const base = new BaseController();
const course = new CourseController_1.default();
const user = new UserController_1.default();
const jurusan = new JurusanController_1.default();
const kelas = new KelasController_1.default();
const routes = express_1.default.Router();
const auth = new AuthController_1.default();
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
exports.default = routes;
//# sourceMappingURL=routes.js.map