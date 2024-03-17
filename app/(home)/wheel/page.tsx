import { auth } from "@/auth";
import WheelWrapper from "@/components/home/wheel-wrapper";
import { Question } from "@prisma/client";
import { sql } from "@vercel/postgres";
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
  const surveyCompleted = searchParams?.surveyCompleted || "";

  const result = await sql<Omit<Question, "active" | "date">>`
      SELECT id, description, "valueOne", "valueTwo", "valueThree"
      FROM "Question"
      WHERE active = true
      ORDER BY date DESC
`;

  const questions = result.rows;
  if (questions.length === 0) return notFound();

  return (
    <>
      {surveyCompleted && completed ? (
        <p
          key={"not-completed-title"}
          className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Merci de votre participation 🤍
        </p>
      ) : !completed ? (
        <p
          key={"not-completed-title"}
          className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Répondez aux questions 👇
        </p>
      ) : (
        <p
          key={"completed-title"}
          className="animate-fade-up mt-6 text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Découvrez les informations liées à votre score ✨
        </p>
      )}

      <WheelWrapper
        user={user}
        questions={questions}
        completed={completed}
        initial={initial}
        surveyCompleted={surveyCompleted}
      />
    </>
  );
}
