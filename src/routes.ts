import express from "express";
import BaseController from "./controller/BaseController.js";
import UserController from "./controller/UserController.js";

const base = new BaseController();
const user = new UserController();
const routes = express.Router();

// Index Route
routes.get("/", base.index);

// Mahasiswa Route
routes.get("/user/mahasiswa/getMahasiswa", user.getMahasiswa)

// Dosen Routes
routes.get("/user/dosen/getDosen", user.getDosen)

export default routes;