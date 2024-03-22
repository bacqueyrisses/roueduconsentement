import CopyButton from "@/components/home/copy-button";
import { Highlight } from "@/components/home/results-stack";
import { motion } from "framer-motion";
import { User } from "next-auth";
export function FinalCard({ score }: { score: User["score"] }) {
  return (
    <div className="relative h-60 w-96 -translate-y-16 md:h-[22rem] md:w-[35rem]">
      <motion.div
        className="flex h-60 w-96 translate-y-20 animate-fade-up flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 opacity-0 shadow-xl shadow-black/[0.1] md:h-[22rem] md:w-[35rem] md:p-5"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
        <div
          className={`font-normal text-neutral-700 transition-opacity md:leading-relaxed `}
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
          <div className="font-medium text-neutral-500">Test</div>
          <div className="flex items-center justify-between font-normal text-neutral-400">
            Merci
            <CopyButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
