import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as item from "drizzle-orm/mysql-core";
import { kelas } from "./kelas";
import { jurusan } from "./jurusan";
import { relations } from "drizzle-orm";

export const mahasiswa = table("mahasiswa", {
  id: item.int().primaryKey().autoincrement(),
  nim: item.int().notNull().unique(),
  nama_mahasiswa: item.varchar({ length: 256 }).notNull(),
  tempat_lahir: item.varchar({ length: 256 }).notNull(),
  tanggal_lahir: item.date().notNull(),
  kelasId: item.int().references(() => kelas.id),
  jurusanId: item.int().references(() => jurusan.id),
  alamat: item.longtext(),
  email: item.varchar({ length: 256 }).unique().notNull(),
  username: item.varchar({ length: 256 }).unique().notNull(),
  password: item.varchar({ length: 15 }).unique().notNull(),
  jenis_kelamin: item
    .mysqlEnum(["none", "laki-laki", "perempuan"])
    .default("none"),
});

export const mahasiswaRelation = relations(mahasiswa, ({ one }) => ({
  kelas: one(kelas, {
    fields: [mahasiswa.kelasId],
    references: [kelas.id],
  }),

  jurusan: one(jurusan, {
    fields: [mahasiswa.jurusanId],
    references: [jurusan.id],
  }),
}));
