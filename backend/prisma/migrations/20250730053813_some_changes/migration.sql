-- CreateTable
CREATE TABLE "public"."_BookmarksToCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookmarksToCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookmarksToCategories_B_index" ON "public"."_BookmarksToCategories"("B");

-- AddForeignKey
ALTER TABLE "public"."_BookmarksToCategories" ADD CONSTRAINT "_BookmarksToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BookmarksToCategories" ADD CONSTRAINT "_BookmarksToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
