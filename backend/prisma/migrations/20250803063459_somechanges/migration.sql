/*
  Warnings:

  - You are about to drop the column `category` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookmarksToCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Bookmarks" DROP CONSTRAINT "Bookmarks_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bookmarks" DROP CONSTRAINT "Bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BookmarksToCategories" DROP CONSTRAINT "_BookmarksToCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BookmarksToCategories" DROP CONSTRAINT "_BookmarksToCategories_B_fkey";

-- AlterTable
ALTER TABLE "public"."Bookmark" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Bookmarks";

-- DropTable
DROP TABLE "public"."_BookmarksToCategories";

-- AddForeignKey
ALTER TABLE "public"."Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bookmark" ADD CONSTRAINT "Bookmark_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
