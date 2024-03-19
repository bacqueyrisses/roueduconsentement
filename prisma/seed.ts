import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create Admin User
    await prisma.user.upsert({
      where: { emailAdmin: "admin@email.com" },
      update: {},
      create: {
        pseudo: "Admin",
        role: "admin",
      },
    });

    // Create Questions
    const questions = await Promise.all([
      prisma.question.upsert({
        where: { description: "Est-ce que j’en ai envie ?" },
        update: {},
        create: {
          description: "Est-ce que j’en ai envie ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que j’ai demandé à l’autre si il en a envie ?",
        },
        update: {},
        create: {
          description: "Est-ce que j’ai demandé à l’autre si il en a envie ?",
          valueOne: 10,
          valueTwo: 5,
          valueThree: 2,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: { description: "Est-ce que je peux dire non ?" },
        update: {},
        create: {
          description: "Est-ce que je peux dire non ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que j’ai peur des conséquences si je dis non ?",
        },
        update: {},
        create: {
          description: "Est-ce que j’ai peur des conséquences si je dis non ?",
          valueOne: 0,
          valueTwo: 2,
          valueThree: 10,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: { description: "Est-ce que je peux partir / stopper ?" },
        update: {},
        create: {
          description: "Est-ce que je peux partir / stopper ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je peux en parler à mon partenaire, un professionnel, un ami, la famille ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je peux en parler à mon partenaire, un professionnel, un ami, la famille ?",
          valueOne: 10,
          valueTwo: 5,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: { description: "Est-ce que je sais ce que je ne veux pas ?" },
        update: {},
        create: {
          description: "Est-ce que je sais ce que je ne veux pas ?",
          valueOne: 10,
          valueTwo: 5,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que je sais ce que l’autre ne veut pas ?",
        },
        update: {},
        create: {
          description: "Est-ce que je sais ce que l’autre ne veut pas ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que j’ai toutes les informations pour vivre cette expérience sans danger?",
        },
        update: {},
        create: {
          description:
            "Est-ce que j’ai toutes les informations pour vivre cette expérience sans danger?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je me sens obligé de faire ce qu’on attend de moi ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je me sens obligé de faire ce qu’on attend de moi ?",
          valueOne: 0,
          valueTwo: 2,
          valueThree: 10,
          active: true,
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je suis en capacité de prendre une décision? (Etat émotionnel, consommation de produit)",
        },
        update: {},
        create: {
          description:
            "Est-ce que je suis en capacité de prendre une décision? (Etat émotionnel, consommation de produit)",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
        },
      }),
    ]);

    console.log({ questions });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
