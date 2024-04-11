"use client";

import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Help from "@/components/icons/help";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import { createAnswer } from "@/lib/actions/answers";
import { updateSession } from "@/lib/actions/auth";
import { addScore } from "@/lib/actions/users";
import { QuestionWithoutActiveAndDate } from "@/lib/database/questions";
import { retry } from "@/lib/utils";
import { Question } from "@prisma/client";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DetailsDialog from "@/components/home/details-dialog";

interface WheelWrapper {
  user: User;
  questions: QuestionWithoutActiveAndDate[];
  completed: string | User["completed"];
  initial: string;
  surveyCompleted: string | User["surveyCompleted"];
}

export default function WheelWrapper({
  user,
  questions,
  answers,
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
    <>
      <section
        className={"relative mx-auto flex w-full flex-col items-center gap-4"}
      >
        <div className={"space-x-2"}>
          <DetailsDialog
            answers={answers}
            surveyCompleted={surveyCompleted}
            initial={initial}
            score={score}
          />
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>Définition du consentement</span>
          </button>
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>Liens utiles</span>
          </button>
        </div>
      </section>
      <section
        className="flex h-full w-full animate-fade-up items-center justify-center overflow-hidden opacity-0 p-6"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={score} />
      </section>
    </>
  ) : (
    <>
      <section
        className={
          "w-screen animate-fade-up px-2 text-stone-600 opacity-0 flex-grow max-w-3xl space-y-6"
        }
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <h1
          className={
            "animate-fade-up text-center text-xl font-semibold tracking-tight"
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
            className="relative inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 disabled:pointer-events-none md:px-7 md:text-base"
          >
            <input name={"option"} value={"Oui"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueOne" ? (
              <>
                <Check className={"invisible size-5 md:size-6"} />
                <span className={"invisible"}>Oui</span>
                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <Check className={"size-5 md:size-6"} />
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
            className="relative inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-sm font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 disabled:pointer-events-none md:px-7 md:text-base"
          >
            <input name={"option"} value={"Non"} type="hidden" />
            <input
              name={"summary"}
              value={questions[currentQuestionIndex]?.summary}
              type="hidden"
            />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueTwo" ? (
              <>
                <X className={"invisible size-5 md:size-6"} />
                <span className={"invisible"}>Non</span>
                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <X className={"size-5 md:size-6"} />
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
            className="relative inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-sm font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300 hover:text-yellow-800 disabled:pointer-events-none md:px-7 md:text-base"
          >
            <input name={"option"} value={"Je sais pas"} type="hidden" />
            <input
              name={"description"}
              value={questions[currentQuestionIndex]?.description}
              type="hidden"
            />
            {loading === "valueThree" ? (
              <>
                <Help className={"invisible size-5 md:size-6"} />
                <span className={"invisible whitespace-nowrap"}>
                  Je sais pas
                </span>

                <Loader
                  className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
                />
              </>
            ) : (
              <>
                <X className={"size-5 md:size-6"} />
                <span className={"whitespace-nowrap"}>Je sais pas</span>
              </>
            )}
          </button>
        </form>
      </section>
    </>
  );
}
