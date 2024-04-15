"use client";
import { Highlight } from "@/components/home/results-stack";
import SurveyDialog from "@/components/home/survey-dialog";
import Refresh from "@/components/icons/refresh";
import RightArrow from "@/components/icons/right-arrow";
import { signout } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";
import { motion } from "framer-motion";
import { Route } from "next";
import { User } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Answer } from "@prisma/client";
import Wheel from "@/components/home/wheel";

// type Card = {
//   id: number;
//   value: string;
//   survey?: boolean;
//   designation: string;
//   content: ReactNode | null;
//   contentCompleted?: ReactNode;
// };

interface CardStack {
  items: Answer[];
  answers: Answer[];
  surveyCompleted: string | User["surveyCompleted"];
  score: User["score"];
  offset?: number;
  scaleFactor?: number;
  initial: string;
}

export default function CardStack({
  items,
  surveyCompleted,
  score,
  offset,
  answers,
  scaleFactor,
  initial,
  setIsOpen,
}: CardStack) {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(!!surveyCompleted);
  const CARD_OFFSET = offset || 0;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Answer[]>(
    [...answers].sort((a, b) => b.date - a.date),
  );
  const [indexCard, setIndexCard] = useState(1);
  const completed = cards.length === indexCard;

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
    if (cards.length === indexCard) return;
    setIndexCard((prevState) => prevState + 1);
    setCards((prevCards: Answer[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  };

  return (
    <div className="relative flex h-full w-full translate-y-8 justify-center">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute flex h-[380px] w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:w-4/5 md:p-5"
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
                className={`font-normal leading-relaxed text-neutral-700 flex w-full items-center flex-col justify-center`}
              >
                {!completed ? (
                  card.summary
                ) : (
                  <p>
                    <Highlight>Merci d'avoir participé</Highlight> à notre jeu,
                    toutes les informations données restent anonymes. Vous
                    pouvez cliquer sur le <Highlight>bouton vert</Highlight>{" "}
                    pour partagez quelques informations.{" "}
                  </p>
                )}
                {/*{!isSurveyCompleted && !card.content && score ? (*/}
                {/*  <p>*/}
                {/*    <Highlight>Félicitations,</Highlight> vous avez répondu à*/}
                {/*    toutes les questions. Votre score est de*/}
                {/*    <Highlight score={score}>*/}
                {/*      {score.toFixed(1)} sur 10.*/}
                {/*    </Highlight>{" "}*/}
                {/*    Cliquez sur{" "}*/}
                {/*    <span className={"font-medium italic"}>suivant</span> pour*/}
                {/*    avoir plus d'informations !*/}
                {/*  </p>*/}
                {/*) : (*/}
                {/*  card.content*/}
                {/*)}*/}
              </div>
              <div className={"h-36 w-full translate-y-4"}>
                <Wheel value={completed ? score : card.value} />
              </div>

              <div>
                <div className="font-medium text-neutral-500 mb-0.5">
                  <Highlight>Question {"2"}</Highlight>
                </div>
                <div className="flex items-center justify-between font-normal text-neutral-500">
                  <Highlight score={card.value}>Score : {card.value}</Highlight>
                  {completed ? (
                    <SurveyDialog setDetailsOpen={setIsOpen} />
                  ) : (
                    <button
                      onClick={flip}
                      className="z-100 group absolute right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:right-5"
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
      {/*{!initial && (*/}
      {/*  <button*/}
      {/*    key={"not-completed-button"}*/}
      {/*    onClick={async () => {*/}
      {/*      localStorage.removeItem("answeredQuestions");*/}
      {/*      localStorage.removeItem("surveyCompleted");*/}
      {/*      localStorage.removeItem("score");*/}

      {/*      await signout(paths.toHome);*/}
      {/*    }}*/}
      {/*    className={`absolute bottom-16 z-[200] flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-amber-100 px-5 py-2 text-base font-medium text-amber-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-amber-200 hover:text-amber-800 md:bottom-12 md:px-7`}*/}
      {/*    style={{*/}
      {/*      animationDelay: "1.5s",*/}
      {/*      animationFillMode: "forwards",*/}
      {/*      animationDuration: "800ms",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Refresh className={"size-5"} />*/}
      {/*    <span>Jouer à nouveau</span>*/}
      {/*  </button>*/}
      {/*)}*/}
    </div>
  );
}
