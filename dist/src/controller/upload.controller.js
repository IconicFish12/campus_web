"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, "../../uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Hanya file gambar yang diperbolehkan!"), false);
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
const uploadFile = (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res
            .status(200)
            .json({ message: "File berhasil diunggah!", file: req.file });
    });
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload.controller.js.map