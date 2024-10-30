import joi from "joi";

export const mahasiswaValidation = joi
  .object({
    nim: joi.number().max(13).min(12).required(),
    nama_mahasiswa: joi.string().required(),
    tempat_lahir: joi.string().required(),
    tanggal_lahir: joi.date().required(),
    alamat: joi.string().required(),
    email: joi.string().email(),
    username: joi.string().min(4).max(12).required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  })
  .required();

export const dosenValidatio = joi
  .object({
    nip: joi.number().max(13).min(12).required(),
    kode_dosen: joi.number().max(3).required(),
    nama_dosen: joi.string().required(),
    tempat_lahir: joi.string().required(),
    tanggal_lahir: joi.date().required(),
    bidang_keahlian: joi.string().required(),
    alamat: joi.string().required(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  })
  .required();

export const jurusanValidation = joi
  .object({
    nama_jurusan: joi.string().required(),
  })
  .required();

export const kelasValidation = joi
  .object({
    nama_kelas: joi.string().alphanum().required(),
  })
  .required();
