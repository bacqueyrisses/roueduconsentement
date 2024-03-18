"use client";

import CardStackDemo from "@/components/home/results-stack";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Help from "@/components/icons/help";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import { updateSession } from "@/lib/actions/auth";
import { addScore, createAnswer } from "@/lib/actions/rest";
import { retry } from "@/lib/helpers";
import { Question } from "@prisma/client";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WheelWrapper {
  user: User;
  questions: Omit<Question, "active" | "date">[];
  completed: string | User["completed"];
  initial: string;
  surveyCompleted: string;
}
interface OptionButton {
  valueKey: keyof Pick<
    Omit<Question, "active" | "date">,
    "valueOne" | "valueTwo" | "valueThree"
  >;
  loading: string;
  handleClick: (
    key: keyof Pick<
      Omit<Question, "active" | "date">,
      "valueOne" | "valueTwo" | "valueThree"
    >,
  ) => void;
  buttonText: string;
  buttonColor: string;
}

export default function WheelWrapper({
  user,
  questions,
  completed,
  initial,
  surveyCompleted,
}: WheelWrapper) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(
    Number(JSON.parse(localStorage.getItem("score") as string)) || 5,
  );
  const [loading, setLoading] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("initial");
    replace(`${pathname}?${params.toString()}` as Route);
  }, []);

  function handleAnswer(
    key: keyof Pick<
      Omit<Question, "active" | "date">,
      "valueOne" | "valueTwo" | "valueThree"
    >,
  ) {
    if (currentQuestionIndex === questions.length - 1)
      return handleCompleted(key);
    const currentValue = questions[currentQuestionIndex][key];
    const newScore = (score + currentValue) / 2;

    setScore(newScore);
    localStorage.setItem("score", JSON.stringify(newScore));

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

  async function handleCompleted(value: string) {
    if (!score) return;

    setLoading(value);
    addScore(score).catch(() => retry(() => addScore(score)));

    await updateSession({ completed: true });

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
          "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-base font-medium text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 md:px-7"
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
      surveyCompleted={
        localStorage.getItem("surveyCompleted") || surveyCompleted
      }
      score={score}
    />
  ) : (
    <>
      <div
        className={"w-screen animate-fade-up text-stone-600 opacity-0"}
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <h1
          className={
            "mx-auto max-w-5xl animate-fade-up text-center text-xl font-semibold tracking-tight md:text-2xl"
          }
        >
          {questions[currentQuestionIndex]?.description}
        </h1>
        <form
          action={async (data) => {
            try {
              await createAnswer(data);
            } catch (error) {
              console.error(error);
              toast(
                <div
                  className={
                    "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 py-2 text-base font-medium text-red-600 md:px-7"
                  }
                >
                  <X />
                  <h1>Une erreur est survenue. Réessayez.</h1>
                </div>,
              );
            }
          }}
          className={"flex items-center justify-center gap-3 md:gap-4"}
        >
          <button
            type={"submit"}
            onClick={() => handleAnswer("valueOne")}
            value={questions[currentQuestionIndex]?.valueOne}
            name={"value"}
            disabled={!!loading}
            className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-base font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 disabled:pointer-events-none md:px-7"
          >
            <input name={"option"} value={"Oui"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueOne" ? (
              <>
                <Check className={"invisible size-6"} />
                <span className={"invisible"}>Oui</span>
                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <Check className={"size-6"} />
                <span>Oui</span>
              </>
            )}
          </button>
          <button
            type={"submit"}
            onClick={() => handleAnswer("valueTwo")}
            value={questions[currentQuestionIndex]?.valueTwo}
            name={"value"}
            disabled={!!loading}
            className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-base font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 disabled:pointer-events-none md:px-7"
          >
            <input name={"option"} value={"Non"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueTwo" ? (
              <>
                <X className={"invisible size-6"} />
                <span className={"invisible"}>Non</span>
                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <X className={"size-6"} />
                <span>Non</span>
              </>
            )}
          </button>
          <button
            type={"submit"}
            onClick={() => handleAnswer("valueThree")}
            name={"value"}
            disabled={!!loading}
            value={questions[currentQuestionIndex]?.valueThree}
            className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-base font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300 hover:text-yellow-800 disabled:pointer-events-none md:px-7"
          >
            <input name={"option"} value={"Je sais pas"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueThree" ? (
              <>
                <Help className={"invisible size-6"} />
                <span className={"invisible"}>Je sais pas</span>

                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <X className={"size-6"} />
                <span>Je sais pas</span>
              </>
            )}
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
