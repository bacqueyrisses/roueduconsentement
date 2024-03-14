import { auth } from "@/auth";
import WheelWrapper from "@/components/home/wheel-wrapper";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    completed?: string;
    initial?: string;
  };
}) {
  const completed = searchParams?.completed || "";
  const initial = searchParams?.initial || "";

  const session = await auth();
  const user = session?.user;
  if (!user) notFound();
  console.log(session?.expires);

  const result = await sql`
      SELECT id, description, value
      FROM questions
      ORDER BY date DESC
`;

  const questions = result.rows;

  return (
    <>
      {!completed ? (
        <p
          className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Répondez aux questions 👇
        </p>
      ) : (
        <p
          className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
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
      />
    </>
  );
}
