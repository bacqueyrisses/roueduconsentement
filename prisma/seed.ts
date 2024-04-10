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
          summary:
            "Il est important de comprendre ce qu’il se passe en toi. Essaye de te poser et d’identifier si ce que tu ressens est plutôt agréable comme  de la sérénité,  de la joie, de la confiance, de la gaîté ou  désagréable comme de la peur, de la tristesse, de la colère ou du dégoût . Si tu as des doutes ou des craintes, n’hésite pas à les exprimer à ton/ta/tes partenaire.s.",
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je suis ok avec ce que je veux et ce que je ne veux pas ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je suis ok avec ce que je veux et ce que je ne veux pas ?",
          valueOne: 10,
          valueTwo: 5,
          valueThree: 0,
          active: true,
          summary:
            "Écouter tes limites te permet de gagner en confiance et d’aller (ou pas) vers de nouvelles expériences.Ton refus ne remet pas en question ton désir pour ton/ta/tes partenaire.s.",
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que j’ai pu exprimer ce dont j’avais envie ?",
        },
        update: {},
        create: {
          description: "Est-ce que j’ai pu exprimer ce dont j’avais envie ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
          summary:
            "Pouvoir s’exprimer librement avec son/sa/ses partenaire.s permet d’établir une relation de confiance que ce soit pour une nuit ou pour la vie! Une mauvaise communication peut être source d'incompréhension et donc menacer le consentement.",
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je me sens obligé.e de faire ce qu’on attend de moi ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je me sens obligé.e de faire ce qu’on attend de moi ?",
          valueOne: 0,
          valueTwo: 2,
          valueThree: 10,
          active: true,
          summary:
            "Parfois, même quand on n’en a pas envie, on accepte quand même une relation pour faire plaisir ou même pour avoir la paix. Si c’est ton cas, tu peux essayer d’en parler avec ton/ta/tes partenaire.s. N’oublie pas que tu as le droit de dire “stop” à n'importe quel moment. Tu peux aussi consulter les ressources à la fin de l’appli.",
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
          summary:
            "Dire non, ce n’est pas toujours évident mais cela ne doit pas devenir un frein pour autant. Sache que la loi qualifie d’agression sexuelle tout acte de nature sexuelle commis avec violence, contrainte, menace ou surprise.",
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que je peux dire non ?",
        },
        update: {},
        create: {
          description: "Est-ce que je peux dire non ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
          summary:
            "Tu as le droit  d' exprimer ton refus à chaque instant. Si ce n’est pas le cas, tu peux essayer de proposer à ton/ta/tes partenaire.s de reporter ce moment à plus tard.",
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que j’ai suffisamment d’informations pour vivre cette expérience en toute sérénité (consentement, grossesse,infections sexuellement transmissibles,etc.) ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que j’ai suffisamment d’informations pour vivre cette expérience en toute sérénité (consentement, grossesse,infections sexuellement transmissibles,etc.) ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
          summary: `Rappelle-toi que le risque zéro n’existe pas et que le préservatif est un moyen de contraception et de protection efficace contre les IST. Il est possible de te faire dépister gratuitement et anonymement dans le <a href="https://vih.org/cegidd/">CéGIDD</a> de ton département aussi souvent que tu le souhaites et même si tu es en relation exclusive!`,
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je suis capable de prendre une décision? (État émotionnel, consommation d’alcool, de médicaments, de drogues, etc.) ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je suis capable de prendre une décision? (État émotionnel, consommation d’alcool, de médicaments, de drogues, etc.) ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
          summary:
            "Si tu ne te sens pas capable de comprendre ce qu’il se passe, il est toujours possible de remettre à plus tard. Tu peux aussi te tourner vers une personne de confiance.",
        },
      }),
      prisma.question.upsert({
        where: {
          description: "Est-ce que je peux stopper/partir ?",
        },
        update: {},
        create: {
          description: "Est-ce que je peux stopper/partir ?",
          valueOne: 10,
          valueTwo: 2,
          valueThree: 0,
          active: true,
          summary:
            "Si quelque chose te gêne, n’hésite pas à prendre un temps pour réfléchir à comment mettre fin à cette situation. Tu peux, par exemple, trouver un prétexte pour partir (rendez-vous oublié, urgence familiale…)",
        },
      }),
      prisma.question.upsert({
        where: {
          description:
            "Est-ce que je peux en parler à une personne de confiance (Ami.e.s, famille, professionnel.le.s…) ?",
        },
        update: {},
        create: {
          description:
            "Est-ce que je peux en parler à une personne de confiance (Ami.e.s, famille, professionnel.le.s…) ?",
          valueOne: 10,
          valueTwo: 5,
          valueThree: 0,
          active: true,
          summary:
            "Avoir une personne vers qui se tourner lorsqu’on est dans une situation compliquée/délicate peut déjà t’aider à te sentir mieux. Si ce n’est pas le cas, tu peux essayer d’interpeller une personne autour de toi (Barman/Barmaid, vendeur.euse, professeur.e, …)",
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
