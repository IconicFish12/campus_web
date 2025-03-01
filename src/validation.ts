import joi from "joi";

export const mahasiswaValidation = joi
  .object({
    nim: joi.number().min(4).required(),
    nama_mahasiswa: joi.string().required(),
    tempat_lahir: joi.string().required(),
    tanggal_lahir: joi.date().required(),
    jurusanId: joi.number(),
    kelasId: joi.number(),
    alamat: joi.string().max(100),
    email: joi.string().email(),
    username: joi.string().min(4).max(12).required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .max(15),
    jenis_kelamin: joi.string(),
  })
  .required();

export const dosenValidation = joi
  .object({
    nip: joi.number().min(4).required(),
    nama_dosen: joi.string().required(),
    tempat_lahir: joi.string().required(),
    tanggal_lahir: joi.date().required(),
    bidang_keahlian: joi.string().required(),
    jurusanId: joi.number(),
    alamat: joi.string().max(100),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .max(15),
    jenis_kelamin: joi.string(),
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
    jurusanId: joi.number(),
    dosenId: joi.number(),
    jumlahMahasiswa: joi.number().required(),
  })
  .required();

export const MatKulValidation = joi.object({
  nama_matkul: joi.string().required(),
  dosenId: joi.number(),
  jurusanId: joi.number(),
  kelasId: joi.number(),
});

export const tugasInputValidation = joi.object({
  nama_tugas: joi.string().required(),
  mataKuliahId: joi.number().required(),
  desc : joi.string().required(),
  deadline : joi.date().required(),
});

export const NilaiInputValidation = joi.object({
  nilai: joi.number().required(),
  tugasMahasiswaId: joi.number().required(),
  comment : joi.string()
});

export const loginValidation = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .max(15),
  })
  .required();
