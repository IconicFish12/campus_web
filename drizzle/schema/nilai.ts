import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { tugas_mahasiswa } from "./tugas_mahasiswa";
import { relations, sql } from "drizzle-orm";

export const nilai = table("nilai", {
  id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  nilai: item.integer().notNull(),
  tugasMahasiswaId: item.integer().references(() => tugas_mahasiswa.id).default(1),
  comment: item.text()
});

export const nilaiRelation = relations(nilai, ({ many, one }) => ({
  tugas_mahasiswa: one(tugas_mahasiswa, {
    fields: [nilai.tugasMahasiswaId],
    references: [tugas_mahasiswa.id],
  }),
}));
