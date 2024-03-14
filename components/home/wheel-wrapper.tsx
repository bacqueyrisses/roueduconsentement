"use client";

import CardStackDemo from "@/components/home/results-stack";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Question from "@/components/icons/question";
import X from "@/components/icons/x";
import { createAnswer } from "@/lib/actions/rest";
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
  surveyCompleted,
}: {
  user: User;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(5);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  console.log(currentQuestionIndex);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("initial");
    replace(`${pathname}?${params.toString()}` as Route);
  }, []);

  function handleAnswer(value: string) {
    if (currentQuestionIndex === questions.length - 1) return handleCompleted();
    const currentValue = questions[currentQuestionIndex][`value${value}`];
    const newScore =
      (score * currentQuestionIndex + currentValue) /
      (currentQuestionIndex + 1);
    setScore(newScore);

    const answeredQuestions = JSON.parse(
      localStorage.getItem("answeredQuestions") || "{}",
    );
    answeredQuestions[currentQuestionIndex] = true;
    localStorage.setItem(
      "answeredQuestions",
      JSON.stringify(answeredQuestions),
    );

    let nextIndex = currentQuestionIndex + 1;
    while (answeredQuestions[nextIndex]) {
      nextIndex++;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleCompleted() {
    const params = new URLSearchParams(searchParams);

    params.set("completed", "true");
    params.set("initial", "true");
    replace(`${pathname}?${params.toString()}` as Route);
  }

  useEffect(() => {
    const answeredQuestions = JSON.parse(
      localStorage.getItem("answeredQuestions") || "{}",
    );
    let index = 0;
    while (answeredQuestions[index]) {
      index++;
    }
    setCurrentQuestionIndex(index);
  }, []);

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
    <CardStackDemo
      initial={initial}
      surveyCompleted={surveyCompleted}
      score={score}
    />
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
        <form
          action={async (data) => {
            try {
              await createAnswer(data);
              if (currentQuestionIndex === questions.length - 1)
                return handleCompleted();
            } catch (error) {
              console.error(error);
              toast(
                <div
                  className={
                    "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 py-2 text-base font-medium text-red-600 md:px-7"
                  }
                >
                  <X />
                  <h1>Une erreur est survenue.</h1>
                </div>,
              );
            }
          }}
          className={"flex items-center justify-center gap-4"}
        >
          <button
            type={"submit"}
            onClick={() => handleAnswer("One")}
            value={questions[currentQuestionIndex]?.valueOne}
            name={"value"}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800"
          >
            <input name={"option"} value={"D'accord"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            <Check className={"size-6"} />
            <span>D'accord</span>
          </button>
          <button
            type={"submit"}
            onClick={() => handleAnswer("Two")}
            value={questions[currentQuestionIndex]?.valueTwo}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-base font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 md:px-7"
          >
            <input name={"option"} value={"Pas d'accord"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            <X className={"size-6"} />
            <span>Pas d'accord</span>
          </button>
          <button
            type={"submit"}
            onClick={() => handleAnswer("Three")}
            value={questions[currentQuestionIndex]?.valueThree}
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-base font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300 hover:text-yellow-800 md:px-7"
          >
            <input name={"option"} value={"Je ne sais pas"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            <Question className={"size-6"} />
            <span>Je ne sais pas</span>
          </button>
        </form>
      </div>
      <div
        className="flex w-full animate-fade-up items-center justify-center overflow-hidden opacity-0"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={score} />
      </div>
    </>
  );
}
