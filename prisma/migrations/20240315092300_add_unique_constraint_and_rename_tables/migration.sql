/*
  Warnings:

  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Answers";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT NOT NULL,
    "valueOne" INTEGER NOT NULL,
    "valueTwo" INTEGER NOT NULL,
    "valueThree" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pseudo" VARCHAR(255) NOT NULL,
    "score" DECIMAL,
    "age" INTEGER,
    "completed" BOOLEAN DEFAULT false,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_description_key" ON "Question"("description");
