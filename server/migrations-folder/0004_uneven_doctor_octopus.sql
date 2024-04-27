CREATE TABLE `notes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`chapter` varchar(200),
	`header` varchar(1000),
	`body` varchar(5000),
	`pdfId` bigint,
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `notes` ADD CONSTRAINT `notes_pdfId_pdfs_id_fk` FOREIGN KEY (`pdfId`) REFERENCES `pdfs`(`id`) ON DELETE no action ON UPDATE no action;