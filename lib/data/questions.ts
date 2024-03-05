interface Decision {
  id: number;
  question: string;
}

export const questions: Decision[] = [
  { id: 1, question: "Est-ce que j’en ai envie ?" },
  { id: 2, question: "Est-ce que j’ai demandé à l’autre si il en a envie ?" },
  { id: 3, question: "Est-ce que je peux dire non ?" },
  { id: 4, question: "Est-ce que j’ai peur des conséquences si je dis non ?" },
  { id: 5, question: "Est-ce que je peux partir / stopper ?" },
  {
    id: 6,
    question:
      "Est-ce que je peux en parler à mon partenaire, un professionnel, un ami, la famille ?",
  },
  { id: 7, question: "Est-ce que je sais que je ne veux pas ?" },
  { id: 8, question: "Est-ce que l’autre ne veux pas ?" },
  { id: 9, question: "Est-ce que j’identifie des dangers ?" },
  {
    id: 10,
    question: "Est-ce que je me sens obligé de faire ce qu’on attend de moi ?",
  },
  {
    id: 11,
    question:
      "Est-ce que la situation me convient ? (Ambiance, consommation de produits, état physique et émotionnel)",
  },
];
