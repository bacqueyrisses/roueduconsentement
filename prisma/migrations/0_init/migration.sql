-- CreateTable
CREATE TABLE "Answers" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid (),
  "userId" UUID NOT NULL,
  "description" TEXT NOT NULL,
  "option" TEXT NOT NULL,
  "value" INTEGER NOT NULL,
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid (),
  "description" TEXT NOT NULL,
  "valueOne" INTEGER NOT NULL,
  "valueTwo" INTEGER NOT NULL,
  "valueThree" INTEGER NOT NULL,
  "active" BOOLEAN NOT NULL,
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid (),
  "pseudo" VARCHAR(255) NOT NULL,
  "score" DECIMAL,
  "age" INTEGER,
  "completed" BOOLEAN DEFAULT FALSE,
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
