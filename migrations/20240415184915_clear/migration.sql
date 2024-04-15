-- DropForeignKey
ALTER TABLE `categoryrating` DROP FOREIGN KEY `CategoryRating_rating_id_fkey`;

-- AddForeignKey
ALTER TABLE `CategoryRating` ADD CONSTRAINT `CategoryRating_rating_user_id_fkey` FOREIGN KEY (`rating_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
