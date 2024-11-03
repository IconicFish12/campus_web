import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { jurusan } from "./jurusan";
import { dosen } from "./dosen";
import { kelas } from "./kelas";
import { relations, sql } from "drizzle-orm";
import { tugas_mahasiswa } from "./tugas_mahasiswa";

export const mataKuliah = table("mata_kuliah", {
  id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  nama_matkul: item.varchar({ length: 256 }).notNull(),
  dosenId: item.integer().references(() => dosen.id).default(1),
  jurusanId: item.integer().references(() => jurusan.id).default(1),
  kelasId: item.integer().references(() => kelas.id).default(1),
});

export const mataKuliahRelation = relations(mataKuliah, ({ many, one }) => ({
  dosen: one(dosen, {
    fields: [mataKuliah.dosenId],
    references: [dosen.id],
  }),

  jurusan: many(jurusan),
  kelas: many(kelas),
  tugas_mahasiswa: many(tugas_mahasiswa),
}));
