/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `userId`;
