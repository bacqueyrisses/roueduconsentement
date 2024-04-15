"use client";

import DefinitionButton from "@/components/buttons/definition";
import LinksButton from "@/components/buttons/links";
import DetailsDialog from "@/components/home/details-dialog";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import Refresh from "@/components/icons/refresh";
import QuestionStack from "@/components/ui/question-stack";
import { signout } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";
import { QuestionWithoutActive } from "@/lib/database/questions";
import { Highlight } from "@/lib/utils";
import { Answer } from "@prisma/client";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WheelWrapper {
  user: User;
  questions: QuestionWithoutActive[];
  answers: Answer[];
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
  const [score, setScore] = useState(
    Number(JSON.parse(localStorage.getItem("score") as string)) || 5,
  );
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("initial");
    replace(`${pathname}?${params.toString()}` as Route);
  }, []);

  return completed ? (
    <>
      <section
        className={"relative mx-auto flex w-full flex-col items-center gap-4"}
      >
        <div className={"space-x-2"}>
          <DetailsDialog
            answers={answers}
            surveyCompleted={
              localStorage.getItem("surveyCompleted") || surveyCompleted
            }
            initial={initial}
            score={score}
          />
          <DefinitionButton />
          <LinksButton />
        </div>
      </section>
      <section
        className="flex flex-col h-full w-full animate-fade-up items-center justify-center overflow-hidden opacity-0 p-6"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={score} />
        {score && (
          <Highlight score={score} className={"absolute bottom-[19%]"}>
            Mon score: {score.toFixed(1)}
          </Highlight>
        )}

        <button
          key={"completed-button"}
          onClick={async () => {
            localStorage.removeItem("answeredQuestions");
            localStorage.removeItem("surveyCompleted");
            localStorage.removeItem("score");

            await signout(paths.toHome);
          }}
          className={`${initial ? "invisible" : "visible"} z-40 flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-amber-100 px-5 py-2 text-base font-medium text-amber-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-amber-200 hover:text-amber-800 md:bottom-8 md:px-7`}
          style={{
            animationDelay: "1.5s",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <Refresh className={"size-5"} />
          <span>Jouer à nouveau</span>
        </button>
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
        <QuestionStack
          setScore={setScore}
          questions={questions}
          surveyCompleted={
            localStorage.getItem("surveyCompleted") || surveyCompleted
          }
          score={score}
        />
      </section>
    </>
  );
}
