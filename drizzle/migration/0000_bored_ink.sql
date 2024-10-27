CREATE TABLE `dosen` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nip` int NOT NULL,
	`kode_dosen` varchar(3) NOT NULL,
	`nama_dosen` varchar(256) NOT NULL,
	`tempat_lahir` varchar(256) NOT NULL,
	`tanggal_lahir` date NOT NULL,
	`jurusanId` int,
	`bidang_keahlian` longtext NOT NULL,
	`alamat` longtext NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(15) NOT NULL,
	`jenis_kelamin` enum('none','laki-laki','perempuan') DEFAULT 'none',
	CONSTRAINT `dosen_id` PRIMARY KEY(`id`),
	CONSTRAINT `dosen_nip_unique` UNIQUE(`nip`),
	CONSTRAINT `dosen_kode_dosen_unique` UNIQUE(`kode_dosen`),
	CONSTRAINT `dosen_email_unique` UNIQUE(`email`),
	CONSTRAINT `dosen_password_unique` UNIQUE(`password`)
);
--> statement-breakpoint
CREATE TABLE `jurusan` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_jurusan` varchar(256),
	CONSTRAINT `jurusan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kelas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_kelas` varchar(256),
	CONSTRAINT `kelas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mahasiswa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nim` int NOT NULL,
	`nama_mahasiswa` varchar(256) NOT NULL,
	`tempat_lahir` varchar(256) NOT NULL,
	`tanggal_lahir` date NOT NULL,
	`kelasId` int,
	`jurusanId` int,
	`alamat` longtext,
	`email` varchar(256) NOT NULL,
	`username` varchar(256) NOT NULL,
	`password` varchar(15) NOT NULL,
	`jenis_kelamin` enum('none','laki-laki','perempuan') DEFAULT 'none',
	CONSTRAINT `mahasiswa_id` PRIMARY KEY(`id`),
	CONSTRAINT `mahasiswa_nim_unique` UNIQUE(`nim`),
	CONSTRAINT `mahasiswa_email_unique` UNIQUE(`email`),
	CONSTRAINT `mahasiswa_username_unique` UNIQUE(`username`),
	CONSTRAINT `mahasiswa_password_unique` UNIQUE(`password`)
);
--> statement-breakpoint
CREATE TABLE `mata_kuliah` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_matkul` varchar(256) NOT NULL,
	`dosenId` int,
	`jurusanId` int,
	`kelasId` int,
	CONSTRAINT `mata_kuliah_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nilai` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nilai` int NOT NULL,
	`tugasMahasiswaId` int,
	CONSTRAINT `nilai_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tugas_mahasiswa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_tugas` varchar(256) NOT NULL,
	`mataKuliahId` int,
	`desc` longtext NOT NULL,
	`deadline` date NOT NULL,
	CONSTRAINT `tugas_mahasiswa_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `dosen` ADD CONSTRAINT `dosen_jurusanId_jurusan_id_fk` FOREIGN KEY (`jurusanId`) REFERENCES `jurusan`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mahasiswa` ADD CONSTRAINT `mahasiswa_kelasId_kelas_id_fk` FOREIGN KEY (`kelasId`) REFERENCES `kelas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mahasiswa` ADD CONSTRAINT `mahasiswa_jurusanId_jurusan_id_fk` FOREIGN KEY (`jurusanId`) REFERENCES `jurusan`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mata_kuliah` ADD CONSTRAINT `mata_kuliah_dosenId_dosen_id_fk` FOREIGN KEY (`dosenId`) REFERENCES `dosen`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mata_kuliah` ADD CONSTRAINT `mata_kuliah_jurusanId_jurusan_id_fk` FOREIGN KEY (`jurusanId`) REFERENCES `jurusan`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mata_kuliah` ADD CONSTRAINT `mata_kuliah_kelasId_kelas_id_fk` FOREIGN KEY (`kelasId`) REFERENCES `kelas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_tugasMahasiswaId_tugas_mahasiswa_id_fk` FOREIGN KEY (`tugasMahasiswaId`) REFERENCES `tugas_mahasiswa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tugas_mahasiswa` ADD CONSTRAINT `tugas_mahasiswa_mataKuliahId_mata_kuliah_id_fk` FOREIGN KEY (`mataKuliahId`) REFERENCES `mata_kuliah`(`id`) ON DELETE no action ON UPDATE no action;