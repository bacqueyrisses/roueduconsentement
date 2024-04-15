"use client";
import { FinalCard } from "@/components/home/final-card";
import CardStack from "@/components/ui/card-stack";
import { User } from "next-auth";
import { ReactNode, useState } from "react";

interface CardStackDemo {
  initial: string;
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
}
export default function CardStackWrapper({
  initial,
  surveyCompleted,
  score,
  answers,
  setIsOpen,
}: CardStackDemo) {
  return (
    <div
      className={
        "z-10 flex h-full w-full animate-fade-up flex-col items-center justify-center gap-10 opacity-0"
      }
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      {!surveyCompleted ? (
        <CardStack
          key={"not-completed-card"}
          items={CARDS}
          answers={answers}
          surveyCompleted={surveyCompleted}
          score={score}
          initial={initial}
          setIsOpen={setIsOpen}
        />
      ) : (
        <FinalCard key={"not-completed-card"} score={score} initial={initial} />
      )}
    </div>
  );
}

export const Highlight = ({
  children,
  score,
}: {
  children: ReactNode;
  className?: string;
  score?: User["score"];
}) => {
  return (
    <span
      className={`px-1 py-0.5 font-bold ${score === undefined ? "bg-emerald-100 text-emerald-700" : score <= 4 ? "bg-red-100 text-red-700" : score <= 7 ? "bg-yellow-100 text-yellow-700" : "bg-emerald-100 text-emerald-700"}`}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Score",
    designation: "Votre score",
    content: null,
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
      </p>
    ),
  },
];
