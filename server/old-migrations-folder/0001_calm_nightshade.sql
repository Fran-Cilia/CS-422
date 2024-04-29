ALTER TABLE `pdfs` MODIFY COLUMN `name` varchar(40);--> statement-breakpoint
ALTER TABLE `pdfs` ADD `alias` varchar(20);