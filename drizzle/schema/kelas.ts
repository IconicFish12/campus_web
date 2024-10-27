import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { mahasiswa } from "./mahasiswa";
import { mataKuliah } from "./mata_kuliah";

export const kelas = table("kelas", {
  id: item.integer().primaryKey(),
  nama_kelas: item.varchar({ length: 256 }),
});

export const kelasRelation = relations(kelas, ({ many, one }) => ({
  mahasiswa: many(mahasiswa),
  mataKuliah: many(mataKuliah),
}));
