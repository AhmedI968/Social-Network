/*
  Warnings:

  - You are about to drop the column `user_id` on the `scorecard` table. All the data in the column will be lost.
  - Added the required column `rated_user_id` to the `Scorecard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating_user_id` to the `Scorecard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scorecard` DROP FOREIGN KEY `Scorecard_user_id_fkey`;

-- AlterTable
ALTER TABLE `scorecard` DROP COLUMN `user_id`,
    ADD COLUMN `rated_user_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating_user_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserMatch` (
    `match_id` VARCHAR(191) NOT NULL,
    `user1_id` VARCHAR(191) NOT NULL,
    `user2_id` VARCHAR(191) NOT NULL,
    `matchedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rating_given` DOUBLE NULL,
    `rating_received` DOUBLE NULL,
    `feeback_received` BOOLEAN NULL,

    UNIQUE INDEX `UserMatch_user1_id_user2_id_key`(`user1_id`, `user2_id`),
    PRIMARY KEY (`match_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_user1_id_fkey` FOREIGN KEY (`user1_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_user2_id_fkey` FOREIGN KEY (`user2_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scorecard` ADD CONSTRAINT `Scorecard_rating_user_id_fkey` FOREIGN KEY (`rating_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scorecard` ADD CONSTRAINT `Scorecard_rated_user_id_fkey` FOREIGN KEY (`rated_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
