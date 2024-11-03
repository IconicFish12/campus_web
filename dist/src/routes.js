"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BaseController_1 = __importDefault(require("../src/controller/BaseController"));
const UserController_1 = __importDefault(require("../src/controller/UserController"));
const JurusanController_1 = __importDefault(require("../src/controller/JurusanController"));
const KelasController_1 = __importDefault(require("../src/controller/KelasController"));
const base = new BaseController_1.default();
const user = new UserController_1.default();
const jurusan = new JurusanController_1.default();
const kelas = new KelasController_1.default();
const routes = express_1.default.Router();
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
routes.delete("/user/deleteDosen/:id", user.deleteDosen);
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
exports.default = routes;
//# sourceMappingURL=routes.js.map