"use client";
import { Highlight } from "@/components/home/results-stack";
import SurveyDialog from "@/components/home/survey-dialog";
import RightArrow from "@/components/icons/right-arrow";
import { motion } from "framer-motion";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Card = {
  id: number;
  name: string;
  survey?: boolean;
  designation: string;
  content: ReactNode | null;
  contentCompleted?: ReactNode;
};

interface CardStack {
  items: Card[];
  surveyCompleted: string;
  score: User["score"];
  offset?: number;
  scaleFactor?: number;
}

export default function CardStack({
  items,
  surveyCompleted,
  score,
  offset,
  scaleFactor,
}: CardStack) {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(!!surveyCompleted);
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(
    [...items].sort((a, b) => b.id - a.id),
  );

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    surveyCompleted && setIsSurveyCompleted(!!surveyCompleted);

    const params = new URLSearchParams(searchParams);

    params.delete("surveyCompleted");
    replace(`${pathname}?${params.toString()}` as Route);
  }, [surveyCompleted]);

  const flip = () => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  };

  return (
    <div className="relative h-60 w-96 md:h-[16rem] md:w-[27rem]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white h-60 w-96 md:h-[16rem] md:w-[27rem] rounded-3xl md:p-5 p-4 shadow-xl border border-neutral-200 shadow-black/[0.1] flex flex-col justify-between"
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
                className={`font-normal text-neutral-700 md:leading-relaxed`}
              >
                {!isSurveyCompleted && !card.content && score ? (
                  <p>
                    <Highlight>Félicitations,</Highlight> vous avez répondu à
                    toutes les questions. Votre score est de
                    <Highlight score={score}>
                      {score.toFixed(1)} sur 10.
                    </Highlight>{" "}
                    Cliquez sur{" "}
                    <span className={"italic font-medium"}>suivant</span> pour
                    avoir plus d'informations !
                  </p>
                ) : (
                  card.content
                )}
              </div>

              <div>
                <p className="text-neutral-500 font-medium">{card.name}</p>
                <p className="flex justify-between items-center text-neutral-400 font-normal">
                  {card.designation}
                  {!card.survey ? (
                    <button
                      onClick={flip}
                      className="group z-100 absolute right-4 md:right-5 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 py-1 font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-300 ease-in-out hover:bg-emerald-200 px-3"
                    >
                      <RightArrow
                        className={
                          "size-5 group-hover:translate-x-[0.1px] transition"
                        }
                      />
                      <span>Suivant</span>
                    </button>
                  ) : (
                    <SurveyDialog />
                  )}
                </p>
              </div>
            </>
          </motion.div>
        );
      })}
    </div>
  );
}
