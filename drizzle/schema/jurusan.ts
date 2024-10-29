import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { mahasiswa } from "./mahasiswa";
import { dosen } from "./dosen";
import { mataKuliah } from "./mata_kuliah";

export const jurusan = table("jurusan", {
  id: item.bigint({ mode : "bigint" }).primaryKey(),
  nama_jurusan: item.varchar({ length: 256 }),
});

export const jurusanRelation = relations(jurusan, ({ many, one }) => ({
  mahasiswa: many(mahasiswa),
  dosen: many(dosen),
  mataKuliah: many(mataKuliah),
}));
