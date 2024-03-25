/*
Warnings:

- A unique constraint covering the columns `[emailAdmin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_emailAdmin_key" ON "User" ("emailAdmin");
