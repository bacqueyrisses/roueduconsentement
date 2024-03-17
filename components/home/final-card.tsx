import CopyButton from "@/components/home/copy-button";
import { Highlight } from "@/components/home/results-stack";
import { motion } from "framer-motion";
import { User } from "next-auth";
export function FinalCard({ score }: { score: User["score"] }) {
  return (
    <motion.div
      className="absolute bg-white h-60 w-96 md:h-[20rem] md:w-[32rem] rounded-3xl md:p-5 p-4 shadow-xl border border-neutral-200 shadow-black/[0.1] flex flex-col justify-between animate-fade-up opacity-0"
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
    >
      <div
        className={`font-normal text-neutral-700 md:leading-relaxed transition-opacity `}
      >
        <p>
          <Highlight>Merci d'avoir répondu</Highlight> à notre questionnaire,
          toutes les informations données restent anonymes.
          <br />
          Pour rappel, votre score est de{" "}
          <Highlight score={score}>{score.toFixed(1)} sur 10.</Highlight> <br />
          Vous pouvez cliquer sur le <Highlight>bouton vert</Highlight> pour
          copier le lien du site. <br />
          <Highlight>À bientôt !</Highlight>
        </p>
      </div>
      <div>
        <p className="text-neutral-500 font-medium">Test</p>
        <p className="flex justify-between items-center text-neutral-400 font-normal">
          Merci
          <CopyButton />
        </p>
      </div>
    </motion.div>
  );
}
