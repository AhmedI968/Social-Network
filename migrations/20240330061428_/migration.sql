/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_idx` ON `user`;

-- DropIndex
DROP INDEX `User_name_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `isAdmin`,
    DROP COLUMN `name`,
    DROP COLUMN `role`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `last_active` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `age` INTEGER NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `admin_pin` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `user_id` VARCHAR(191) NOT NULL,
    `race` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `sexuality` VARCHAR(191) NULL,
    `religion` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interest` (
    `interest_id` VARCHAR(191) NOT NULL,
    `interest_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`interest_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterestCategory` (
    `category_id` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInterest` (
    `user_id` VARCHAR(191) NOT NULL,
    `interest_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scorecard` (
    `scorecard_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `cumulative_score` DOUBLE NOT NULL,
    `last_updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`scorecard_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterestRating` (
    `rating_id` VARCHAR(191) NOT NULL,
    `rating_user_id` VARCHAR(191) NOT NULL,
    `interest_id` VARCHAR(191) NOT NULL,
    `rated_user_id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NOT NULL,
    `scorecard_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryRating` (
    `rating_id` VARCHAR(191) NOT NULL,
    `rating_user_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `rated_user_id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NOT NULL,
    `scorecard_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRates` (
    `rating_id` VARCHAR(191) NOT NULL,
    `user1_id` VARCHAR(191) NOT NULL,
    `user2_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwoWayRanking` (
    `ranking_id` VARCHAR(191) NOT NULL,
    `user1_id` VARCHAR(191) NOT NULL,
    `user2_id` VARCHAR(191) NOT NULL,
    `score_1` DOUBLE NOT NULL,
    `score_2` DOUBLE NOT NULL,

    PRIMARY KEY (`ranking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRanking` (
    `ranking_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ranking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WrittenFeedback` (
    `feedback_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `written_user_id` VARCHAR(191) NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`feedback_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedbackResponse` (
    `feedback1_id` VARCHAR(191) NOT NULL,
    `feedback2_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`feedback1_id`, `feedback2_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInterest` ADD CONSTRAINT `UserInterest_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInterest` ADD CONSTRAINT `UserInterest_interest_id_fkey` FOREIGN KEY (`interest_id`) REFERENCES `Interest`(`interest_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInterest` ADD CONSTRAINT `UserInterest_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `InterestCategory`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scorecard` ADD CONSTRAINT `Scorecard_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestRating` ADD CONSTRAINT `InterestRating_rating_id_fkey` FOREIGN KEY (`rating_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestRating` ADD CONSTRAINT `InterestRating_interest_id_fkey` FOREIGN KEY (`interest_id`) REFERENCES `Interest`(`interest_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestRating` ADD CONSTRAINT `InterestRating_rated_user_id_fkey` FOREIGN KEY (`rated_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestRating` ADD CONSTRAINT `InterestRating_scorecard_id_fkey` FOREIGN KEY (`scorecard_id`) REFERENCES `Scorecard`(`scorecard_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryRating` ADD CONSTRAINT `CategoryRating_rating_id_fkey` FOREIGN KEY (`rating_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryRating` ADD CONSTRAINT `CategoryRating_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `InterestCategory`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryRating` ADD CONSTRAINT `CategoryRating_rated_user_id_fkey` FOREIGN KEY (`rated_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryRating` ADD CONSTRAINT `CategoryRating_scorecard_id_fkey` FOREIGN KEY (`scorecard_id`) REFERENCES `Scorecard`(`scorecard_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRates` ADD CONSTRAINT `UserRates_user1_id_fkey` FOREIGN KEY (`user1_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRates` ADD CONSTRAINT `UserRates_user2_id_fkey` FOREIGN KEY (`user2_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoWayRanking` ADD CONSTRAINT `TwoWayRanking_user1_id_fkey` FOREIGN KEY (`user1_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoWayRanking` ADD CONSTRAINT `TwoWayRanking_user2_id_fkey` FOREIGN KEY (`user2_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRanking` ADD CONSTRAINT `UserRanking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrittenFeedback` ADD CONSTRAINT `WrittenFeedback_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WrittenFeedback` ADD CONSTRAINT `WrittenFeedback_written_user_id_fkey` FOREIGN KEY (`written_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackResponse` ADD CONSTRAINT `FeedbackResponse_feedback1_id_fkey` FOREIGN KEY (`feedback1_id`) REFERENCES `WrittenFeedback`(`feedback_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackResponse` ADD CONSTRAINT `FeedbackResponse_feedback2_id_fkey` FOREIGN KEY (`feedback2_id`) REFERENCES `WrittenFeedback`(`feedback_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
