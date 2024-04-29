import Check from "@/components/icons/check";
import Help from "@/components/icons/help";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import { createAnswer } from "@/lib/actions/answers";
import { updateSession } from "@/lib/actions/auth";
import { addScore } from "@/lib/actions/users";
import { QuestionWithoutActive } from "@/lib/database/questions";
import { Highlight, retry } from "@/lib/utils";
import { Question } from "@prisma/client";
import { motion } from "framer-motion";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, useState } from "react";
import { toast } from "sonner";

interface QuestionCards {
  questions: QuestionWithoutActive[];
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
  setScore: Dispatch<number>;
}

export default function QuestionCards({
  score,
  setScore,
  questions,
}: QuestionCards) {
  const CARD_OFFSET = 0;
  const SCALE_FACTOR = 0.06;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [cards, setCards] = useState<QuestionWithoutActive[]>(() => {
    const answeredQuestionsData = localStorage.getItem("answeredQuestions");
    const initialAnsweredQuestions = answeredQuestionsData
      ? JSON.parse(answeredQuestionsData)
      : {};

    const answeredIndices = Object.keys(initialAnsweredQuestions).map(Number);

    const updatedQuestions = questions.filter(
      (q) => !answeredIndices.includes(q.id - 1),
    );

    const nextUnansweredIndex = answeredIndices.length;
    setCurrentQuestionIndex(
      nextUnansweredIndex !== questions.length ? nextUnansweredIndex : 0,
    );
    return updatedQuestions;
  });

  const [loading, setLoading] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleAnswer(
    key: keyof Pick<
      Omit<Question, "active" | "date">,
      "valueOne" | "valueTwo" | "valueThree"
    >,
  ) {
    if (currentQuestionIndex === questions.length - 1)
      return handleCompleted(key);
    flip();
    const currentValue = questions[currentQuestionIndex][key];
    const newScore = (score + currentValue) / 2;

    setScore(newScore);
    localStorage.setItem("score", JSON.stringify(newScore));

    const answeredQuestions = JSON.parse(
      localStorage.getItem("answeredQuestions") || "{}",
    );

    const updatedAnsweredQuestions = {
      ...answeredQuestions,
      [currentQuestionIndex]: true, // Update the answered state for current question
    };

    localStorage.setItem(
      "answeredQuestions",
      JSON.stringify(updatedAnsweredQuestions),
    );

    let nextIndex = currentQuestionIndex + 1;
    while (updatedAnsweredQuestions[nextIndex]) {
      nextIndex++;
    }

    setCurrentQuestionIndex(nextIndex);
  }

  async function handleCompleted(value: string) {
    if (!score) return;

    setLoading(value);
    addScore(score).catch(() => retry(() => addScore(score)));

    await updateSession({ completed: true, score });

    const params = new URLSearchParams(searchParams);

    params.set("completed", "true");
    replace(`${pathname}?${params.toString()}` as Route);
  }

  const flip = () => {
    if (currentQuestionIndex === questions.length - 1) return;

    setCards((prevCards) => {
      const newCards = [...prevCards];
      const lastCard = newCards.pop();
      newCards.unshift(lastCard!);
      return newCards;
    });
  };
  return (
    <div
      className={
        "relative flex h-full w-full translate-y-8 items-center justify-center md:translate-y-12"
      }
    >
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={
              "absolute flex h-[300px] w-full flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:w-4/5 md:gap-2 md:p-5"
            }
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: (cards.length - index - 1) * -CARD_OFFSET, // Reverse the order for animation
              scale: 1 - (cards.length - index - 1) * SCALE_FACTOR, // Decrease scale for cards that are behind
              zIndex: index + 1, // Increase z-index for the cards that are behind
            }}
          >
            <>
              <div className={"pt-2 text-center text-base md:text-lg"}>
                <Highlight>Question numéro {10 - card.id + 1}</Highlight>
              </div>
              <div
                className={
                  "flex w-full flex-grow flex-col items-center justify-center px-2 text-center text-lg font-normal leading-relaxed text-neutral-700 md:px-12"
                }
              >
                {card.description}
              </div>

              <div>
                <form
                  action={async (data) => {
                    try {
                      await createAnswer(data);
                    } catch (error) {
                      console.error(error);
                      toast(
                        <div
                          className={
                            "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 text-base font-medium text-red-600 md:px-7"
                          }
                        >
                          <X />
                          <h1>Une erreur est survenue. Réessayez.</h1>
                        </div>,
                      );
                    }
                  }}
                  className={
                    "flex items-center justify-center gap-3 pb-2 md:gap-4"
                  }
                >
                  <button
                    type={"submit"}
                    onClick={() => handleAnswer("valueOne")}
                    value={questions[currentQuestionIndex]?.valueOne}
                    name={"value"}
                    disabled={!!loading}
                    className={
                      "relative inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 disabled:pointer-events-none md:px-7 md:text-base"
                    }
                  >
                    <input name={"option"} value={"Oui"} type="hidden" />
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
                    {loading === "valueOne" ? (
                      <>
                        <Check className={"invisible size-5 md:size-6"} />
                        <span className={"invisible"}>Oui</span>
                        <Loader
                          className={
                            "absolute inset-0 m-auto size-5 animate-spin-slow"
                          }
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
                    className={
                      "relative inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-sm font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 disabled:pointer-events-none md:px-7 md:text-base"
                    }
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
                          className={
                            "absolute inset-0 m-auto size-5 animate-spin-slow"
                          }
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
                    className={
                      "relative inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-5 py-2 text-sm font-medium text-yellow-700 transition-colors duration-300 ease-in-out hover:bg-yellow-300/80 hover:text-yellow-800 disabled:pointer-events-none md:px-7 md:text-base"
                    }
                  >
                    <input
                      name={"option"}
                      value={"Je sais pas"}
                      type="hidden"
                    />
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
                    {loading === "valueThree" ? (
                      <>
                        <Help className={"invisible size-5 md:size-6"} />
                        <span className={"invisible whitespace-nowrap"}>
                          Je sais pas
                        </span>

                        <Loader
                          className={
                            "absolute inset-0 m-auto size-5 animate-spin-slow"
                          }
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
              </div>
            </>
          </motion.div>
        );
      })}
    </div>
  );
}
