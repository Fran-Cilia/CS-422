CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`chapter` text,
	`header` text,
	`question` text,
	`answer` text,
	`pdfId` integer,
	FOREIGN KEY (`pdfId`) REFERENCES `pdfs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pdfs` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`author` text,
	`path` text,
	`pdfOwnerId` integer,
	FOREIGN KEY (`pdfOwnerId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`pdpPath` text
);
