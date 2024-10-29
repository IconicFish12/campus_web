CREATE TABLE IF NOT EXISTS "dosen" (
	"id" integer PRIMARY KEY NOT NULL,
	"nip" integer NOT NULL,
	"kode_dosen" varchar(3) NOT NULL,
	"nama_dosen" varchar(256) NOT NULL,
	"tempat_lahir" varchar(256) NOT NULL,
	"tanggal_lahir" date NOT NULL,
	"jurusanId" integer,
	"bidang_keahlian" text NOT NULL,
	"alamat" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(15) NOT NULL,
	"jenis_kelamin" varchar DEFAULT 'none',
	CONSTRAINT "dosen_nip_unique" UNIQUE("nip"),
	CONSTRAINT "dosen_kode_dosen_unique" UNIQUE("kode_dosen"),
	CONSTRAINT "dosen_email_unique" UNIQUE("email"),
	CONSTRAINT "dosen_password_unique" UNIQUE("password")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jurusan" (
	"id" integer PRIMARY KEY NOT NULL,
	"nama_jurusan" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kelas" (
	"id" integer PRIMARY KEY NOT NULL,
	"nama_kelas" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mahasiswa" (
	"id" integer PRIMARY KEY NOT NULL,
	"nim" integer NOT NULL,
	"nama_mahasiswa" varchar(256) NOT NULL,
	"tempat_lahir" varchar(256) NOT NULL,
	"tanggal_lahir" date NOT NULL,
	"kelasId" integer,
	"jurusanId" integer,
	"alamat" text,
	"email" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(15) NOT NULL,
	"jenis_kelamin" varchar DEFAULT 'none',
	CONSTRAINT "mahasiswa_nim_unique" UNIQUE("nim"),
	CONSTRAINT "mahasiswa_email_unique" UNIQUE("email"),
	CONSTRAINT "mahasiswa_username_unique" UNIQUE("username"),
	CONSTRAINT "mahasiswa_password_unique" UNIQUE("password")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mata_kuliah" (
	"id" integer PRIMARY KEY NOT NULL,
	"nama_matkul" varchar(256) NOT NULL,
	"dosenId" integer,
	"jurusanId" integer,
	"kelasId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nilai" (
	"id" integer PRIMARY KEY NOT NULL,
	"nilai" integer NOT NULL,
	"tugasMahasiswaId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tugas_mahasiswa" (
	"id" integer PRIMARY KEY NOT NULL,
	"nama_tugas" varchar(256) NOT NULL,
	"mataKuliahId" integer,
	"desc" text NOT NULL,
	"deadline" date NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dosen" ADD CONSTRAINT "dosen_jurusanId_jurusan_id_fk" FOREIGN KEY ("jurusanId") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_kelasId_kelas_id_fk" FOREIGN KEY ("kelasId") REFERENCES "public"."kelas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_jurusanId_jurusan_id_fk" FOREIGN KEY ("jurusanId") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mata_kuliah" ADD CONSTRAINT "mata_kuliah_dosenId_dosen_id_fk" FOREIGN KEY ("dosenId") REFERENCES "public"."dosen"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mata_kuliah" ADD CONSTRAINT "mata_kuliah_jurusanId_jurusan_id_fk" FOREIGN KEY ("jurusanId") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mata_kuliah" ADD CONSTRAINT "mata_kuliah_kelasId_kelas_id_fk" FOREIGN KEY ("kelasId") REFERENCES "public"."kelas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nilai" ADD CONSTRAINT "nilai_tugasMahasiswaId_tugas_mahasiswa_id_fk" FOREIGN KEY ("tugasMahasiswaId") REFERENCES "public"."tugas_mahasiswa"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tugas_mahasiswa" ADD CONSTRAINT "tugas_mahasiswa_mataKuliahId_mata_kuliah_id_fk" FOREIGN KEY ("mataKuliahId") REFERENCES "public"."mata_kuliah"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
