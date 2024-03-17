"use client";
import { FinalCard } from "@/components/home/final-card";
import Refresh from "@/components/icons/refresh";
import CardStack from "@/components/ui/card-stack";
import { signout } from "@/lib/actions/auth";
import { User } from "next-auth";
import { ReactNode } from "react";

interface CardStackDemo {
  initial: string;
  surveyCompleted: string;
  score: User["score"];
  user: User;
}
export default function CardStackDemo({
  initial,
  surveyCompleted,
  score,
  user,
}: CardStackDemo) {
  return (
    <div
      className={`${!surveyCompleted ? "h-[29rem]" : "h-[26rem]"} flex flex-col gap-10 items-center justify-center w-full animate-fade-up opacity-0`}
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      {!surveyCompleted ? (
        <CardStack
          key={"not-completed-card"}
          items={CARDS}
          surveyCompleted={surveyCompleted}
          score={score}
        />
      ) : (
        <FinalCard key={"not-completed-card"} score={score} />
      )}

      {!initial && surveyCompleted ? (
        <button
          key={"not-completed-button"}
          onClick={async () => {
            localStorage.removeItem("answeredQuestions");
            localStorage.removeItem("surveyCompleted");
            localStorage.removeItem("score");
            await signout();
          }}
          className={`bottom-8 md:-bottom-4 absolute  inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-amber-200 text-amber-700 bg-amber-100 hover:text-amber-800 animate-fade-up opacity-0`}
          style={{
            animationDelay: "1.3s",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <Refresh className={"size-5"} />
          <span>Jouer à nouveau</span>
        </button>
      ) : !initial ? (
        <button
          key={"completed-button"}
          onClick={async () => {
            localStorage.removeItem("answeredQuestions");
            localStorage.removeItem("surveyCompleted");
            localStorage.removeItem("score");
            await signout();
          }}
          className={`bottom-10 md:bottom-8 absolute  inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-amber-200 text-amber-700 bg-amber-100 hover:text-amber-800 animate-fade-up opacity-0`}
          style={{
            animationDelay: "1.5s",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <Refresh className={"size-5"} />
          <span>Jouer à nouveau</span>
        </button>
      ) : null}
    </div>
  );
}

export const Highlight = ({
  children,
  score,
}: {
  children: ReactNode;
  className?: string;
  score?: number;
}) => {
  return (
    <span
      className={`font-bold px-1 py-0.5 ${!score ? "bg-emerald-100 text-emerald-700" : score === 0 ? "" : score <= 4 ? "bg-red-100 text-red-700" : score <= 7 ? "bg-yellow-100 text-yellow-700" : "bg-emerald-100 text-emerald-700"}`}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Score",
    designation: "Votre score de consentement",
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
