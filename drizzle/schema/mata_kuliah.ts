import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { jurusan } from "./jurusan";
import { dosen } from "./dosen";
import { kelas } from "./kelas";
import { relations } from "drizzle-orm";
import { tugas_mahasiswa } from "./tugas_mahasiswa";

export const mataKuliah = table("mata_kuliah", {
  id: item.integer().primaryKey(),
  nama_matkul: item.varchar({ length: 256 }).notNull(),
  dosenId: item.integer().references(() => dosen.id),
  jurusanId: item.integer().references(() => jurusan.id),
  kelasId: item.integer().references(() => kelas.id),
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
