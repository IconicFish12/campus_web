import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { mataKuliah } from "./mata_kuliah";
import { relations } from "drizzle-orm";
import { nilai } from "./nilai";

export const tugas_mahasiswa = table("tugas_mahasiswa", {
  id: item.int().primaryKey().autoincrement(),
  nama_tugas: item.varchar({ length: 256 }).notNull(),
  mataKuliahId: item.int().references(() => mataKuliah.id),
  desc: item.longtext().notNull(),
  deadline: item.date().notNull(),
});

export const tugas_mahasiswaRelation = relations(
  tugas_mahasiswa,
  ({ many, one }) => ({
    mataKuliah: one(mataKuliah, {
      fields: [tugas_mahasiswa.mataKuliahId],
      references: [mataKuliah.id],
    }),
    nilai: one(nilai),
  })
);
