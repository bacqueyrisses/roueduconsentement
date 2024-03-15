"use client";

import CardStackDemo from "@/components/home/results-stack";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import { addScore, createAnswer, updateSession } from "@/lib/actions/rest";
import { retry } from "@/lib/helpers";
import { Questions } from "@prisma/client";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WheelWrapper {
  user: User;
  questions: Omit<Questions, "active" | "date">[];
  completed: string | User["completed"];
  initial: string;
  surveyCompleted: string;
}
interface OptionButton {
  valueKey: keyof Pick<
    Omit<Questions, "active" | "date">,
    "valueOne" | "valueTwo" | "valueThree"
  >;
  loading: string;
  handleClick: (
    key: keyof Pick<
      Omit<Questions, "active" | "date">,
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
      Omit<Questions, "active" | "date">,
      "valueOne" | "valueTwo" | "valueThree"
    >,
  ) {
    if (currentQuestionIndex === questions.length - 1)
      return handleCompleted(key);
    const currentValue = questions[currentQuestionIndex][key];
    const newScore =
      (score * currentQuestionIndex + currentValue) /
      (currentQuestionIndex + 1);
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

    await updateSession();

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
      user={user}
    />
  ) : (
    <>
      <div
        className={"mt-6 w-screen animate-fade-up text-stone-600 opacity-0"}
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
          className={"flex items-center justify-center gap-4"}
        >
          <OptionButton
            valueKey="valueOne"
            loading={loading}
            handleClick={handleAnswer}
            buttonText="D'accord"
            buttonColor="emerald"
          />
          <OptionButton
            valueKey="valueTwo"
            loading={loading}
            handleClick={handleAnswer}
            buttonText="Pas d'accord"
            buttonColor="red"
          />
          <OptionButton
            valueKey="valueThree"
            loading={loading}
            handleClick={handleAnswer}
            buttonText="Je ne sais pas"
            buttonColor="yellow"
          />
          {/*<button*/}
          {/*  type={"submit"}*/}
          {/*  onClick={() => handleAnswer("valueOne")}*/}
          {/*  value={questions[currentQuestionIndex]?.valueOne}*/}
          {/*  name={"value"}*/}
          {/*  disabled={!!loading}*/}
          {/*  className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium transition-colors duration-300 ease-in-out md:px-7 hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800 disabled:pointer-events-none"*/}
          {/*>*/}
          {/*  <input name={"option"} value={"D'accord"} type="hidden" />*/}
          {/*  <input*/}
          {/*    name={"description"}*/}
          {/*    value={questions[currentQuestionIndex]?.description}*/}
          {/*    type="hidden"*/}
          {/*  />*/}
          {/*  {loading === "valueOne" ? (*/}
          {/*    <>*/}
          {/*      <Check className={"size-6 invisible"} />*/}
          {/*      <span className={"invisible"}>D'accord</span>*/}
          {/*      <Loader*/}
          {/*        className={"absolute inset-0 m-auto size-5 animate-spin-slow"}*/}
          {/*      />*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <Check className={"size-6"} />*/}
          {/*      <span>D'accord</span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  type={"submit"}*/}
          {/*  onClick={() => handleAnswer("valueTwo")}*/}
          {/*  value={questions[currentQuestionIndex]?.valueTwo}*/}
          {/*  name={"value"}*/}
          {/*  disabled={!!loading}*/}
          {/*  className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-base font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 md:px-7 disabled:pointer-events-none"*/}
          {/*>*/}
          {/*  <input name={"option"} value={"Pas d'accord"} type="hidden" />*/}
          {/*  <input*/}
          {/*    name={"description"}*/}
          {/*    value={questions[currentQuestionIndex]?.description}*/}
          {/*    type="hidden"*/}
          {/*  />*/}
          {/*  {loading === "valueTwo" ? (*/}
          {/*    <>*/}
          {/*      <X className={"size-6 invisible"} />*/}
          {/*      <span className={"invisible"}>Pas d'accord</span>*/}
          {/*      <Loader*/}
          {/*        className={"absolute inset-0 m-auto size-5 animate-spin-slow"}*/}
          {/*      />*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <X className={"size-6"} />*/}
          {/*      <span>Pas d'accord</span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  type={"submit"}*/}
          {/*  onClick={() => handleAnswer("valueThree")}*/}
          {/*  name={"value"}*/}
          {/*  disabled={!!loading}*/}
          {/*  value={questions[currentQuestionIndex]?.valueThree}*/}
          {/*  className="relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-base font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300 hover:text-yellow-800 md:px-7 disabled:pointer-events-none"*/}
          {/*>*/}
          {/*  <input name={"option"} value={"Je ne sais pas"} type="hidden" />*/}
          {/*  <input*/}
          {/*    name={"description"}*/}
          {/*    value={questions[currentQuestionIndex]?.description}*/}
          {/*    type="hidden"*/}
          {/*  />*/}
          {/*  {loading === "valueThree" ? (*/}
          {/*    <>*/}
          {/*      <Question className={"size-6 invisible"} />*/}
          {/*      <span className={"invisible"}>Je ne sais pas</span>*/}

          {/*      <Loader*/}
          {/*        className={"absolute inset-0 m-auto size-5 animate-spin-slow"}*/}
          {/*      />*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <X className={"size-6"} />*/}
          {/*      <span>Je ne sais pas</span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</button>*/}
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

  function OptionButton({
    valueKey,
    loading,
    handleClick,
    buttonText,
    buttonColor,
  }: OptionButton) {
    return (
      <button
        type="submit"
        onClick={() => handleClick(valueKey)}
        value={questions[currentQuestionIndex]?.[valueKey]}
        name="value"
        disabled={!!loading}
        className={`relative mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium text-${buttonColor}-700 transition-colors duration-300 ease-in-out hover:bg-${buttonColor}-300 hover:text-${buttonColor}-800 md:px-7 disabled:pointer-events-none`}
      >
        <input name="option" value={buttonText} type="hidden" />
        <input
          name="description"
          value={questions[currentQuestionIndex]?.description}
          type="hidden"
        />
        {loading === valueKey ? (
          <>
            <Check className="size-6 invisible" />
            <span className="invisible">{buttonText}</span>
            <Loader className="absolute inset-0 m-auto size-5 animate-spin-slow" />
          </>
        ) : (
          <>
            <Check className="size-6" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    );
  }
}
