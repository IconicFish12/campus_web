ALTER TABLE "dosen" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "jurusan" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "jurusan" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "id" SET DATA TYPE bigserial;--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "id" DROP DEFAULT;