ALTER TABLE "dosen" ALTER COLUMN "jurusanId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "dosenId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "jurusanId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "kelasId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "jurusanId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "dosenId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "jurusanId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "kelasId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "tugasMahasiswaId" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "mataKuliahId" SET DEFAULT 0;