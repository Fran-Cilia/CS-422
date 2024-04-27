ALTER TABLE `notes` RENAME COLUMN `body` TO `question`;--> statement-breakpoint
ALTER TABLE `notes` ADD `answer` varchar(5000);