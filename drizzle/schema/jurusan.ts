import { relations } from "drizzle-orm";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { mahasiswa } from "./mahasiswa";
import { dosen } from "./dosen";
import { mataKuliah } from "./mata_kuliah";

export const jurusan = table("jurusan", {
  id: item.int().primaryKey().autoincrement(),
  nama_jurusan: item.varchar({ length: 256 }),
});

export const jurusanRelation = relations(jurusan, ({ many, one }) => ({
  mahasiswa: many(mahasiswa),
  dosen: many(dosen),
  mataKuliah: many(mataKuliah),
}));
