ALTER TABLE "kelas" ALTER COLUMN "nama_kelas" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "kelas" ADD COLUMN "dosenId" integer;--> statement-breakpoint
ALTER TABLE "kelas" ADD COLUMN "jurusanId" integer;--> statement-breakpoint
ALTER TABLE "kelas" ADD COLUMN "jumlahMahasiswa" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kelas" ADD CONSTRAINT "kelas_dosenId_dosen_id_fk" FOREIGN KEY ("dosenId") REFERENCES "public"."dosen"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kelas" ADD CONSTRAINT "kelas_jurusanId_jurusan_id_fk" FOREIGN KEY ("jurusanId") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
