"use client";
import { FinalCard } from "@/components/home/final-card";
import ResultStack from "@/components/ui/result-stack";
import { Answer } from "@prisma/client";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ResultStackWrapper {
  initial: string;
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
  answers: Answer[];
}
export default function ResultStackWrapper({
  initial,
  surveyCompleted,
  score,
  answers,
}: ResultStackWrapper) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("surveyCompleted");
    replace(`${pathname}?${params.toString()}` as Route);
  }, [surveyCompleted]);
  return (
    <div
      className={
        "z-10 flex h-full w-full animate-fade-up flex-col items-center justify-center gap-10 opacity-0"
      }
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      {!surveyCompleted ? (
        <ResultStack
          key={"not-completed-card"}
          answers={answers}
          surveyCompleted={surveyCompleted}
          score={score}
          initial={initial}
        />
      ) : (
        <FinalCard key={"not-completed-card"} score={score} />
      )}
    </div>
  );
}
