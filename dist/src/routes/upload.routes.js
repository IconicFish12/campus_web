"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controller/upload.controller");
const router = (0, express_1.Router)();
router.post("/upload", upload_controller_1.uploadFile);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map