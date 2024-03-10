"use client";
import Wheel from "@/components/wheel";
import { useEffect, useState } from "react";
import Check from "@/components/icons/check";
import X from "@/components/icons/x";
import { questions } from "@/lib/data/questions";
import { toast } from "sonner";
import { User } from "next-auth";
import Question from "@/components/icons/question";

export default function WheelWrapper({ user }: { user: User }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [score2, setScore2] = useState(5);

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

  useEffect(() => {
    toast(
      <div
        className={
          "inline-flex items-center gap-1.5 rounded-full bg-green-200 px-5 py-2 text-base font-medium text-green-600 md:px-7"
        }
      >
        <Check />
        <h1>Bienvenue {user.pseudo}</h1>
      </div>,
    );
  }, []);

  return (
    <>
      <div className={"mt-10 w-screen text-stone-600"}>
        <h1
          className={
            "mx-auto max-w-5xl animate-fade-up text-center text-2xl font-semibold tracking-tight"
          }
        >
          {questions[currentQuestionIndex]?.question}
        </h1>
        <div className={"flex items-center justify-center gap-4"}>
          <button
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1) return;
              if (score2 === 10) return;
              setScore2((prevScore) => prevScore + 1);
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-5 py-2 text-base font-medium text-green-600 transition-colors duration-300 ease-in-out hover:bg-green-300 hover:text-green-700 md:px-7"
          >
            <Check className={"size-6"} />
            <span>D'accord</span>
          </button>
          <button
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1) return;
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
              if (currentQuestionIndex === questions.length - 1) return;
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
      <Wheel value={score2} />
    </>
  );
}
