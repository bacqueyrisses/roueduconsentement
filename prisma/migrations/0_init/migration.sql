-- CreateTable
CREATE TABLE "answers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" TEXT NOT NULL,
    "valueOne" INTEGER NOT NULL,
    "valueTwo" INTEGER NOT NULL,
    "valueThree" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pseudo" VARCHAR(255) NOT NULL,
    "score" DECIMAL,
    "age" INTEGER,
    "completed" BOOLEAN DEFAULT false,
    "date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

