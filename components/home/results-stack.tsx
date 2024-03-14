"use client";
import Refresh from "@/components/icons/refresh";
import { signout } from "@/lib/actions/auth";
import { ReactNode } from "react";
import { CardStack } from "../ui/card-stack";

export default function CardStackDemo({ initial, surveyCompleted }) {
  return (
    <div
      className="h-[30rem] flex flex-col gap-10 items-center justify-center w-full animate-fade-up opacity-0"
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      <CardStack items={CARDS} surveyCompleted={surveyCompleted} />
      {!initial && (
        <button
          onClick={() => signout()}
          className="absolute bottom-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-amber-200 text-amber-700 bg-amber-100 hover:text-amber-800 animate-fade-up opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Refresh className={"size-5"} />
          <span>Jouer à nouveau</span>
        </button>
      )}
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
    name: "Questionnaire",
    survey: true,
    designation: "Aidez nous",
    content: (
      <p>
        <Highlight>Merci d'avoir participé</Highlight> à notre jeu, toutes les
        informations données restent anonymes. Vous pouvez cliquer sur le{" "}
        <Highlight>bouton vert</Highlight> pour partagez quelques informations.{" "}
        <br />À bientôt !
      </p>
    ),
    contentCompleted: (
      <p>
        <Highlight>Merci d'avoir répondu</Highlight> à notre questionnaire,
        toutes les informations données restent anonymes. Vous pouvez cliquer
        sur le <Highlight>bouton vert</Highlight> pour copier le lien du site.{" "}
        <br />À bientôt !
      </p>
    ),
  },
];
