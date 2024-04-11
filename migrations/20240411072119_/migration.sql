/*
  Warnings:

  - The primary key for the `userinterest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `userinterest` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`user_id`, `interest_id`);
