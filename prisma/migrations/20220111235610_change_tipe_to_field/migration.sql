/*
  Warnings:

  - The `refresh_expires_in` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refresh_expires_in",
ADD COLUMN     "refresh_expires_in" INTEGER;
