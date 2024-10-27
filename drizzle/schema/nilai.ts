import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { tugas_mahasiswa } from "./tugas_mahasiswa";
import { relations } from "drizzle-orm";

export const nilai = table("nilai", {
  id: item.int().primaryKey().autoincrement(),
  nilai: item.int().notNull(),
  tugasMahasiswaId: item.int().references(() => tugas_mahasiswa.id),
});

export const nilaiRelation = relations(nilai, ({ many, one }) => ({
  tugas_mahasiswa: one(tugas_mahasiswa, {
    fields: [nilai.tugasMahasiswaId],
    references: [tugas_mahasiswa.id],
  }),
}));
