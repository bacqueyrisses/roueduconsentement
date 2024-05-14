import Check from "@/components/icons/check";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export default function CopyButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => {
        void navigator.clipboard.writeText(`https://consentement.vercel.app`);

        toast(
          <div
            className={
              "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-base font-medium text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 md:px-7"
            }
          >
            <Check />
            <h1>L'adresse du site a été copiée !</h1>
          </div>,
        );
        setIsOpen(false);
      }}
      className={
        "z-100 inline-flex animate-fade-up items-center justify-between gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800"
      }
    >
      <Check className={"size-5"} />

      <span>Copiez le lien</span>
    </button>
  );
}
