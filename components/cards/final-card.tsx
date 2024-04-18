import CopyButton from "@/components/buttons/copy-button";
import { Highlight } from "@/lib/utils";
import { motion } from "framer-motion";
import { User } from "next-auth";

export function FinalCard({ score }: { score: User["score"] }) {
  return (
    <div
      className={"relative flex h-full w-full justify-center md:translate-y-10"}
    >
      <motion.div
        className={
          "absolute flex h-[310px] w-full animate-fade-up flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:w-4/5 md:p-5"
        }
      >
        <div
          className={
            "font-normal leading-relaxed text-neutral-700 transition-opacity"
          }
        >
          <p>
            <Highlight>Merci d'avoir répondu</Highlight> à notre questionnaire,
            toutes les informations données restent anonymes.
            <br />
            Pour rappel, votre score est de{" "}
            <Highlight score={score}>
              {score?.toFixed(1)} sur 10.
            </Highlight>{" "}
            <br />
            Vous pouvez cliquer sur le <Highlight>bouton vert</Highlight> pour
            copier le lien du site. <br />
            <Highlight>À bientôt !</Highlight>
          </p>
        </div>
        <div>
          <div
            className={
              "flex items-center justify-center font-normal text-neutral-400 md:justify-end"
            }
          >
            <CopyButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}