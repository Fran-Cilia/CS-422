CREATE TABLE `pdfs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(200),
	`pdfOwnerId` bigint,
	CONSTRAINT `pdfs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(30),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `pdfs` ADD CONSTRAINT `pdfs_pdfOwnerId_users_id_fk` FOREIGN KEY (`pdfOwnerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;