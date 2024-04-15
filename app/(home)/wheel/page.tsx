import { auth } from "@/auth";
import WheelWrapper from "@/components/home/wheel-wrapper";
import { getAnswers } from "@/lib/database/answers";
import { getQuestionsWithoutActive } from "@/lib/database/questions";
import { Highlight } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    completed?: string;
    initial?: string;
    surveyCompleted?: string;
  };
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) notFound();

  const completed = searchParams?.completed || user?.completed || "";
  const initial = searchParams?.initial || "";
  const surveyCompleted =
    searchParams?.surveyCompleted || user?.surveyCompleted || "";

  const questions = await getQuestionsWithoutActive();
  const answers = await getAnswers(user.id);

  if (questions.length === 0) return notFound();

  return (
    <>
      {!completed ? (
        <p
          key={"not-completed-title"}
          className={
            "animate-fade-up text-balance text-center text-xl text-gray-500 opacity-0"
          }
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Répondez aux questions 👇
        </p>
      ) : (
        <p
          key={"completed-title"}
          className={
            "animate-fade-up text-balance text-center text-base text-gray-500 opacity-0"
          }
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Ce programme est un{" "}
          <Highlight>outil d'information et de réflexion</Highlight> sur le
          consentement. Sa fonction est d'alimenter ton raisonnement, en
          t’accompagnant dans ta prise de décision. Il ne peut en aucun cas te
          dire ce que tu dois faire et se substituer
          <Highlight>à ton propre choix !</Highlight> ✅
        </p>
      )}

      <WheelWrapper
        user={user}
        questions={questions}
        answers={answers}
        completed={completed}
        initial={initial}
        surveyCompleted={surveyCompleted}
      />
    </>
  );
}
