"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BaseController_js_1 = __importDefault(require("./controller/BaseController.js"));
const UserController_js_1 = __importDefault(require("./controller/UserController.js"));
const JurusanController_js_1 = __importDefault(require("./controller/JurusanController.js"));
const KelasController_js_1 = __importDefault(require("./controller/KelasController.js"));
const base = new BaseController_js_1.default();
const user = new UserController_js_1.default();
const jurusan = new JurusanController_js_1.default();
const kelas = new KelasController_js_1.default();
const routes = express_1.default.Router();
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
exports.default = routes;
//# sourceMappingURL=routes.js.map