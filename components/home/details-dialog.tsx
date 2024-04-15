"use client";

import ResultStackWrapper from "@/components/home/result-stack";
import Check from "@/components/icons/check";
import { Answer } from "@prisma/client";
import { User } from "next-auth";
import { useState } from "react";

interface DetailsDialog {
  surveyCompleted: string | User["surveyCompleted"];
  initial: string;
  score: number;
  answers: Answer[];
}

export default function DetailsDialog({
  surveyCompleted,
  initial,
  score,
  answers,
}: DetailsDialog) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={
          "inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
        }
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Check className={"size-6"} />
        <span>Détail des réponses</span>
      </button>

      {isOpen && (
        <div
          className={
            "absolute left-1/2 z-10 flex h-full w-full -translate-x-1/2"
          }
        >
          <ResultStackWrapper
            initial={initial}
            answers={answers}
            surveyCompleted={surveyCompleted}
            score={score}
          />
        </div>
      )}
    </>
  );
}
