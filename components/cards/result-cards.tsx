import SurveyDialog from "@/components/dialogs/survey-dialog";
import RightArrow from "@/components/icons/right-arrow";
import Wheel from "@/components/wheel";
import { Highlight } from "@/lib/utils";
import { Answer } from "@prisma/client";
import { motion } from "framer-motion";
import { User } from "next-auth";
import { useState } from "react";

interface ResultCards {
  answers: Answer[];
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
}

export default function ResultCards({ score, answers }: ResultCards) {
  const CARD_OFFSET = 0;
  const SCALE_FACTOR = 0.06;
  const [cards, setCards] = useState<Answer[]>(
    [...answers].sort((a, b) => b.id - a.id),
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
      className={
        "relative flex h-full w-full translate-y-2 justify-center text-start md:translate-y-6"
      }
    >
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={
              "absolute flex h-[330px] w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:h-[390px] md:w-4/5 md:gap-2 md:p-5"
            }
            style={{
              transformOrigin: "top center",
              // visibility: indexCard + 1 !== card.id ? "hidden" : "visible",
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
                  "flex w-full flex-col items-center justify-center text-sm font-normal text-neutral-700 md:text-base"
                }
              >
                {!completed ? (
                  <div className={"space-y-4"}>
                    <div className={"font-medium"}>👉 {card.description}</div>
                    <div dangerouslySetInnerHTML={{ __html: card.summary }} />
                  </div>
                ) : (
                  <p>
                    <Highlight>Merci d'avoir participé</Highlight> à notre jeu,
                    toutes les informations données restent anonymes. Tu peux
                    cliquer sur le <Highlight>bouton vert</Highlight> pour
                    partager quelques informations.{" "}
                  </p>
                )}
              </div>

              <div
                className={`inline-flex items-end ${!completed ? "justify-between" : "justify-end"}`}
              >
                {!completed && (
                  <>
                    <div className={"inline-flex flex-col"}>
                      <div
                        className={
                          "mb-0.5 flex text-nowrap font-medium text-neutral-500"
                        }
                      >
                        <Highlight>Question {indexCard + 1}</Highlight>
                      </div>
                      <div
                        className={
                          "flex items-center justify-between font-normal text-neutral-500"
                        }
                      >
                        <Highlight score={card.value}>
                          Score : {card.value}
                        </Highlight>
                      </div>
                    </div>
                    <div className={"h-20 w-fit md:h-24"}>
                      <Wheel value={completed ? score : card.value} />
                    </div>
                  </>
                )}
                {completed ? (
                  <SurveyDialog />
                ) : (
                  <button
                    onClick={flip}
                    className={
                      "z-100 group right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:right-5"
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
            </>
          </motion.div>
        );
      })}
    </div>
  );
}
