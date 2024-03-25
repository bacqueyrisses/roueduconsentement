-- CreateTable
CREATE TABLE "Admin" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid (),
  "email" VARCHAR(255) NOT NULL,
  "password" TEXT NOT NULL,
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
