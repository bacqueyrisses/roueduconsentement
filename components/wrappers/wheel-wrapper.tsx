"use client";

import QuestionStack from "@/components/cards/question-cards";
import DefinitionDialog from "@/components/dialogs/definition-dialog";
import DetailsDialog from "@/components/dialogs/details-dialog";
import LinksDialog from "@/components/dialogs/links-dialog";
import Footer from "@/components/footer";
import Check from "@/components/icons/check";
import Refresh from "@/components/icons/refresh";
import Wheel from "@/components/wheel";
import { signout } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";
import { QuestionWithoutActive } from "@/lib/database/questions";
import { Highlight } from "@/lib/utils";
import { Answer } from "@prisma/client";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WheelWrapper {
  user: User;
  questions: QuestionWithoutActive[];
  answers: Answer[];
  completed: string | User["completed"];
  surveyCompleted: string | User["surveyCompleted"];
}

export default function WheelWrapper({
  user,
  questions,
  answers,
  completed,
  surveyCompleted,
}: WheelWrapper) {
  const [score, setScore] = useState(
    Number(JSON.parse(localStorage.getItem("score") as string)) || 5,
  );

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
        <div className={"hidden space-x-2 text-center md:block"}>
          <DetailsDialog
            answers={answers}
            surveyCompleted={
              localStorage.getItem("surveyCompleted") || surveyCompleted
            }
            score={score}
          />
          <DefinitionDialog />
          <LinksDialog variant="wheel" />
        </div>
        <div
          className={
            "flex flex-col items-center justify-center gap-2 md:hidden"
          }
        >
          <div>
            <DetailsDialog
              answers={answers}
              surveyCompleted={
                localStorage.getItem("surveyCompleted") || surveyCompleted
              }
              score={score}
            />
            <LinksDialog variant="wheel" />
          </div>
          <DefinitionDialog />
        </div>
      </section>
      <section
        className={
          "flex h-full animate-fade-up flex-col items-center justify-between overflow-hidden pb-2 opacity-0 md:justify-center md:p-10 md:py-12"
        }
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <p
          className={
            "block text-balance text-center text-sm tracking-tight text-gray-500 md:text-base md:tracking-normal"
          }
        >
          Pour comprendre ton résultat, consulte le{" "}
          <Highlight className={"bg-blue-100 text-blue-500"}>
            détail des réponses
          </Highlight>
          , <br /> aide-toi des pistes qui te sont proposées.
        </p>
        <div className={"h-24 w-fit md:h-full md:w-full"}>
          <Wheel value={score} />
        </div>

        <button
          key={"completed-button"}
          onClick={async () => {
            localStorage.removeItem("answeredQuestions");
            localStorage.removeItem("surveyCompleted");
            localStorage.removeItem("score");

            await signout(paths.toHome);
          }}
          className={
            "z-40 flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-amber-100 px-5 py-2 text-sm font-medium text-amber-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-amber-200 hover:text-amber-800 md:bottom-8 md:px-7 md:text-base"
          }
          style={{
            animationDelay: "1.5s",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <Refresh className={"size-4 md:size-5"} />
          <span>Jouer à nouveau</span>
        </button>
      </section>
    </>
  ) : (
    <>
      <section
        className={
          "w-screen flex-grow animate-fade-up space-y-6 px-2 text-stone-600 opacity-0 md:max-w-3xl"
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
      <Footer visible={true} key={"footer-visible"} />
    </>
  );
}
