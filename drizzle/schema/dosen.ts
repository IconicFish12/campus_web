import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { jurusan } from "./jurusan";
import { relations } from "drizzle-orm";
import { mataKuliah } from "./mata_kuliah";

export const dosen = table("dosen", {
  id: item.bigint({ mode : "bigint" }).primaryKey(),
  nip: item.integer().notNull().unique(),
  kode_dosen: item.varchar({ length: 3 }).unique().notNull(),
  nama_dosen: item.varchar({ length: 256 }).notNull(),
  tempat_lahir: item.varchar({ length: 256 }).notNull(),
  tanggal_lahir: item.date().notNull(),
  jurusanId: item.integer().references(() => jurusan.id),
  bidang_keahlian: item.text().notNull(),
  alamat: item.text().notNull(),
  email: item.varchar({ length: 256 }).unique().notNull(),
  password: item.varchar({ length: 15 }).unique().notNull(),
  jenis_kelamin: item
    .varchar({ enum: ["none", "laki-laki", "perempuan"] })
    .default("none"),
});

export const dosenRelation = relations(dosen, ({ one, many }) => ({
  jurusan: one(jurusan, {
    fields: [dosen.jurusanId],
    references: [jurusan.id],
  }),

  mataKuliah: many(mataKuliah),
}));
