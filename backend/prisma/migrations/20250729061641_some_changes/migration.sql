/*
  Warnings:

  - You are about to drop the column `bookmarkId` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `category` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_bookmarkId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "bookmarkId";
