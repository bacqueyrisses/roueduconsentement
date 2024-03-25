import CopyButton from "@/components/home/copy-button";
import { Highlight } from "@/components/home/results-stack";
import { motion } from "framer-motion";
import { User } from "next-auth";
import Refresh from "@/components/icons/refresh";
import { signout } from "@/lib/actions/auth";
import { paths } from "@/lib/constants";

export function FinalCard({ score }: { score: User["score"] }) {
  return (
    <div className="relative flex h-full -translate-y-8 items-center justify-center">
      <motion.div
        className="flex h-fit w-full animate-fade-up flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 opacity-0 shadow-xl shadow-black/[0.1] md:h-2/3 md:w-11/12 md:p-5"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
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
          <div className="font-medium text-neutral-500">Test</div>
          <div className="flex items-center justify-between font-normal text-neutral-400">
            Merci
            <CopyButton />
          </div>
        </div>
      </motion.div>
      <button
        key={"completed-button"}
        onClick={async () => {
          localStorage.removeItem("answeredQuestions");
          localStorage.removeItem("surveyCompleted");
          localStorage.removeItem("score");

          await signout(paths.toHome);
        }}
        className={`absolute bottom-0 z-[200] flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-amber-100 px-5 py-2 text-base font-medium text-amber-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-amber-200 hover:text-amber-800 md:bottom-8 md:px-7`}
        style={{
          animationDelay: "1.3s",
          animationFillMode: "forwards",
          animationDuration: "800ms",
        }}
      >
        <Refresh className={"size-5"} />
        <span>Jouer à nouveau</span>
      </button>
    </div>
  );
}
