ALTER TABLE "dosen" ALTER COLUMN "nip" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "kode_dosen" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "jurusanId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "alamat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "password" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "dosenId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "jurusanId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "nim" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "kelasId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "jurusanId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "dosenId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "jurusanId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "kelasId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "tugasMahasiswaId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "mataKuliahId" SET DEFAULT 1;