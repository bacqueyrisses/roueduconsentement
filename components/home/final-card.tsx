import CopyButton from "@/components/home/copy-button";
import { Highlight } from "@/lib/utils";
import { motion } from "framer-motion";
import { User } from "next-auth";

export function FinalCard({ score }: { score: User["score"] }) {
  return (
    <div className="relative flex h-full translate-y-10 w-full justify-center">
      <motion.div className="absolute animate-fade-up flex h-[310px] w-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:w-4/5 md:p-5">
        <div
          className={`font-normal leading-relaxed text-neutral-700 transition-opacity`}
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
          <div className="flex items-center justify-end font-normal text-neutral-400">
            <CopyButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
