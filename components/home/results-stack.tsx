"use client";
import { ReactNode } from "react";
import { CardStack } from "../ui/card-stack";
export default function CardStackDemo() {
  return (
    <div
      className="h-[30rem] flex items-center justify-center w-full animate-fade-up opacity-0"
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      <CardStack items={CARDS} />
    </div>
  );
}

export const Highlight = ({
  children,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span className={"font-bold bg-emerald-100 text-emerald-700 px-1 py-0.5"}>
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Score",
    designation: "Votre score de consentement",
    content: (
      <p>
        <Highlight>Félicitations,</Highlight> vous avez répondu à toutes les
        questions. Votre score est de <Highlight>7 sur 10.</Highlight> Cliquez
        sur la carte pour avoir plus d'informations !
      </p>
    ),
  },
  {
    id: 1,
    name: "Recommendations",
    designation: "Notre conseil personnalisé",
    content: (
      <p>
        Lorem ipsum dolor sit amet,
        <Highlight>consectetur adipisicing elit</Highlight>. Asperiores beatae
        corporis eveniet harum inventore iure quae qui{" "}
        <Highlight>veritatis</Highlight> voluptatem voluptatibus.
      </p>
    ),
  },
  {
    id: 2,
    name: "Partager",
    share: true,
    designation: "Faites nous connaître",
    content: (
      <p>
        <Highlight>Merci d'avoir participé</Highlight> à notre jeu, toutes les
        informations données restent anonymes. Vous pouvez cliquer sur le{" "}
        <Highlight>bouton vert</Highlight> pour copier le site et le partager
        dans votre entourage. <br />À bientôt !
      </p>
    ),
  },
];
