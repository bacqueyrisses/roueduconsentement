"use client";

import CardStackDemo from "@/components/home/results-stack";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Question from "@/components/icons/question";
import X from "@/components/icons/x";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WheelWrapper({
  user,
  questions,
  completed,
  initial,
}: {
  user: User;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [score2, setScore2] = useState(5);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handlePositive() {
    if (currentQuestionIndex === questions.length - 1) return;
    // const score = questions[currentQuestionIndex].value;
    const score = questions[currentQuestionIndex].value;

    // @ts-ignore
    setScores([...scores, score]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleNegative() {
    if (currentQuestionIndex === questions.length - 1) return;
    const score = questions[currentQuestionIndex].value;
    // @ts-ignore
    setScores([...scores, score]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const average =
    scores.reduce((acc, cur) => acc + cur, 0) / (scores.length || 1);

  function handleCompleted() {
    const params = new URLSearchParams(searchParams);

    params.set("completed", "true");
    params.set("initial", "true");
    replace(`${pathname}?${params.toString()}` as Route);
  }

  useEffect(() => {
    toast(
      <div
        className={
          "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium md:px-7 hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800"
        }
      >
        <Check />
        <h1>Bienvenue {user.pseudo}</h1>
      </div>,
    );
  }, []);

  return completed ? (
    <CardStackDemo initial={initial} />
  ) : (
    <>
      <div
        className={"mt-10 w-screen animate-fade-up text-stone-600 opacity-0"}
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <h1
          className={
            "mx-auto max-w-5xl animate-fade-up text-center text-2xl font-semibold tracking-tight"
          }
        >
          {questions[currentQuestionIndex]?.description}
        </h1>
        <div className={"flex items-center justify-center gap-4"}>
          <button
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1)
                return handleCompleted();
              if (score2 === 10) return;
              setScore2((prevScore) => prevScore + 1);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800"
          >
            <Check className={"size-6"} />
            <span>D'accord</span>
          </button>
          <button
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1)
                return handleCompleted();
              if (score2 === 0) return;
              setScore2((prevScore) => prevScore - 1);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-base font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 md:px-7"
          >
            <X className={"size-6"} />
            <span>Pas d'accord</span>
          </button>
          <button
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1)
                return handleCompleted();

              if (score2 === 0) return;
              setScore2((prevScore) => prevScore - 1);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-base font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300 hover:text-yellow-800 md:px-7"
          >
            <Question className={"size-6"} />
            <span>Je ne sais pas</span>
          </button>
        </div>
      </div>
      <div
        className="flex w-full animate-fade-up items-center justify-center overflow-hidden opacity-0"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={score2} />
      </div>
    </>
  );
}
