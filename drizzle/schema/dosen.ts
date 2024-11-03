import { pgTable as table } from "drizzle-orm/pg-core";
import * as item from "drizzle-orm/pg-core";
import { jurusan } from "./jurusan";
import { relations, sql } from "drizzle-orm";
import { mataKuliah } from "./mata_kuliah";
import { kelas } from "./kelas";

export const dosen = table("dosen", {
  id: item.integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  nip: item.integer().notNull().unique(),
  kode_dosen: item.varchar().unique().notNull(),
  nama_dosen: item.varchar({ length: 256 }).notNull(),
  tempat_lahir: item.varchar({ length: 256 }).notNull(),
  tanggal_lahir: item.date().notNull(),
  jurusanId: item
    .integer()
    .references(() => jurusan.id)
    .default(1),
  bidang_keahlian: item.text().notNull(),
  alamat: item.text(),
  email: item.varchar({ length: 256 }).unique().notNull(),
  password: item.varchar().notNull(),
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
  kelas: many(kelas),
}));
