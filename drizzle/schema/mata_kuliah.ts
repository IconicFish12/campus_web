import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { jurusan } from "./jurusan";
import { dosen } from "./dosen";
import { kelas } from "./kelas";
import { relations } from "drizzle-orm";
import { tugas_mahasiswa } from "./tugas_mahasiswa";

export const mataKuliah = table("mata_kuliah", {
  id: item.int().primaryKey().autoincrement(),
  nama_matkul: item.varchar({ length: 256 }).notNull(),
  dosenId: item.int().references(() => dosen.id),
  jurusanId: item.int().references(() => jurusan.id),
  kelasId: item.int().references(() => kelas.id),
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
