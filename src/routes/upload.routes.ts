import { Router } from "express";
import { uploadFile } from "../controller/upload.controller";

const router = Router();

router.post("/upload", uploadFile);

export default router;
