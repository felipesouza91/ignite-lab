/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Custumer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Custumer" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Custumer_authUserId_key" ON "Custumer"("authUserId");
