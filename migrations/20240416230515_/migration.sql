-- DropForeignKey
ALTER TABLE `interestrating` DROP FOREIGN KEY `InterestRating_rating_id_fkey`;

-- AddForeignKey
ALTER TABLE `InterestRating` ADD CONSTRAINT `InterestRating_rating_user_id_fkey` FOREIGN KEY (`rating_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
