import { relations } from "drizzle-orm";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { mahasiswa } from "./mahasiswa";
import { mataKuliah } from "./mata_kuliah";

export const kelas = table("kelas", {
  id: item.int().primaryKey().autoincrement(),
  nama_kelas: item.varchar({ length: 256 }),
});

export const kelasRelation = relations(kelas, ({ many, one }) => ({
  mahasiswa: many(mahasiswa),
  mataKuliah: many(mataKuliah),
}));
