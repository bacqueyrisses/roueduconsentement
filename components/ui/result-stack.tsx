import SurveyDialog from "@/components/home/survey-dialog";
import Wheel from "@/components/home/wheel";
import RightArrow from "@/components/icons/right-arrow";
import { Highlight } from "@/lib/utils";
import { Answer } from "@prisma/client";
import { motion } from "framer-motion";
import { User } from "next-auth";
import { useState } from "react";

interface ResultStack {
  answers: Answer[];
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
  initial: string;
}

export default function ResultStack({ score, answers }: ResultStack) {
  const CARD_OFFSET = 0;
  const SCALE_FACTOR = 0.06;
  const [cards, setCards] = useState<Answer[]>(
    [...answers].sort((a, b) => Number(b.date) - Number(+a.date)),
  );
  const [indexCard, setIndexCard] = useState(0);
  const completed = cards.length === indexCard;

  const flip = () => {
    if (cards.length === indexCard) return;
    setIndexCard((prevState) => prevState + 1);
    setCards((prevCards: Answer[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  };

  return (
    <div
      className={"relative flex h-full w-full justify-center md:translate-y-8"}
    >
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={
              "absolute flex h-[380px] w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:w-4/5 md:p-5"
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
              <div
                className={
                  "flex w-full flex-col items-center justify-center text-sm font-normal leading-relaxed text-neutral-700 md:text-base"
                }
              >
                {!completed ? (
                  <div dangerouslySetInnerHTML={{ __html: card.summary }} />
                ) : (
                  <p>
                    <Highlight>Merci d'avoir participé</Highlight> à notre jeu,
                    toutes les informations données restent anonymes. Vous
                    pouvez cliquer sur le <Highlight>bouton vert</Highlight>{" "}
                    pour partagez quelques informations.{" "}
                  </p>
                )}
              </div>
              <div className={"h-20 w-full translate-y-4 md:h-36"}>
                <Wheel value={completed ? score : card.value} />
              </div>

              <div>
                <div className={"mb-0.5 flex font-medium text-neutral-500"}>
                  <Highlight>Question {indexCard + 1}</Highlight>
                </div>
                <div
                  className={
                    "flex items-center justify-between font-normal text-neutral-500"
                  }
                >
                  <Highlight score={card.value}>Score : {card.value}</Highlight>
                  {completed ? (
                    <SurveyDialog />
                  ) : (
                    <button
                      onClick={flip}
                      className={
                        "z-100 group absolute right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:right-5"
                      }
                    >
                      <RightArrow
                        className={
                          "size-5 transition group-hover:translate-x-[0.1px]"
                        }
                      />
                      <span>Suivant</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          </motion.div>
        );
      })}
    </div>
  );
}
