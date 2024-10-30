ALTER TABLE "dosen" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "dosen" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "dosen_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "jurusan" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "jurusan" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "jurusan_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "kelas" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "kelas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "mahasiswa" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "mahasiswa_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "mata_kuliah_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "nilai" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "nilai_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "tugas_mahasiswa" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "tugas_mahasiswa_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);