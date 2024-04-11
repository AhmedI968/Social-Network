/*
  Warnings:

  - Added the required column `category_id` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `interest` ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `InterestCategory`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
