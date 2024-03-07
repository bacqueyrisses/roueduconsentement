interface Decision {
  id: number;
  question: string;
  value: number;
}

export const questions: Decision[] = [
  { id: 1, question: "Est-ce que j’en ai envie ?", value: 10 },
  {
    id: 2,
    question: "Est-ce que j’ai demandé à l’autre si il en a envie ?",
    value: 10,
  },
  { id: 3, question: "Est-ce que je peux dire non ?", value: 10 },
  {
    id: 4,
    question: "Est-ce que j’ai peur des conséquences si je dis non ?",
    value: 0,
  },
  { id: 5, question: "Est-ce que je peux partir / stopper ?", value: 10 },
  {
    id: 6,
    question:
      "Est-ce que je peux en parler à mon partenaire, un professionnel, un ami, la famille ?",
    value: 10,
  },
  { id: 7, question: "Est-ce que je sais que je ne veux pas ?", value: 10 },
  { id: 8, question: "Est-ce que l’autre ne veux pas ?", value: 0 },
  { id: 9, question: "Est-ce que j’identifie des dangers ?", value: 10 },
  {
    id: 10,
    question: "Est-ce que je me sens obligé de faire ce qu’on attend de moi ?",
    value: 0,
  },
  {
    id: 11,
    question: "Est-ce que la situation me convient ?",
    value: 0,
  },
];
