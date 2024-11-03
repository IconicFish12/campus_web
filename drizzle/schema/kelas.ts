import { relations, sql } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { mahasiswa } from "./mahasiswa";
import { mataKuliah } from "./mata_kuliah";
import { jurusan } from "./jurusan";
import { dosen } from "./dosen";

export const kelas = table("kelas", {
  id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  nama_kelas: item.varchar({ length: 20 }),
  dosenId : item.integer().references(() => dosen.id).default(1),
  jurusanId : item.integer().references(() => jurusan.id).default(1),
  jumlahMahasiswa : item.integer().notNull(),
});

export const kelasRelation = relations(kelas, ({ many, one }) => ({
  mahasiswa: many(mahasiswa),
  mataKuliah: many(mataKuliah),

  dosen : one(dosen, {
    fields : [kelas.dosenId],
    references : [dosen.id]
  }),

  jurusan : one(jurusan, {
    fields : [kelas.jurusanId],
    references : [jurusan.id]
  })
}));
