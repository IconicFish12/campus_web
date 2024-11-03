import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { mataKuliah } from "./mata_kuliah";
import { relations, sql } from "drizzle-orm";
import { nilai } from "./nilai";

export const tugas_mahasiswa = table("tugas_mahasiswa", {
  id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  nama_tugas: item.varchar({ length: 256 }).notNull(),
  mataKuliahId: item.integer().references(() => mataKuliah.id).default(1),
  desc: item.text().notNull(),
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
