/*
  Warnings:

  - A unique constraint covering the columns `[membershipId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `membershipId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membershipId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_membershipId_key" ON "User"("membershipId");
