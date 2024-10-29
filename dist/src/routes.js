"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BaseController_js_1 = __importDefault(require("./controller/BaseController.js"));
const UserController_js_1 = __importDefault(require("./controller/UserController.js"));
const base = new BaseController_js_1.default();
const user = new UserController_js_1.default();
const routes = express_1.default.Router();
// Index Route
routes.get("/", base.index);
// Mahasiswa Route
routes.get("/user/mahasiswa/getMahasiswa", user.getMahasiswa);
// Dosen Routes
routes.get("/user/dosen/getDosen", user.getDosen);
exports.default = routes;
//# sourceMappingURL=routes.js.map