"use client";
import Check from "@/components/icons/check";
import Loader from "@/components/icons/loader";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyButton() {
  const [copying, setCopying] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleActive() {
    const params = new URLSearchParams(searchParams);

    params.set("completed", "true");
    params.delete("initial");
    replace(`${pathname}?${params.toString()}` as Route);
  }

  return (
    <button
      onClick={() => {
        setCopying(true);
        void navigator.clipboard.writeText(`https://consentement.vercel.app`);
        setCopying(false);
        toast(
          <div
            className={
              "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-base font-medium md:px-7 hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800"
            }
          >
            <Check />
            <h1>Adresse du site copiée !</h1>
          </div>,
        );
        handleActive();
      }}
      className="z-100 absolute right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 py-1 font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-300 ease-in-out hover:bg-emerald-200 px-3"
      style={{
        animationDelay: "0.3s",
        animationFillMode: "forwards",
      }}
    >
      {copying ? (
        <>
          <span className={"invisible"}>Jouer</span>
          <Loader
            className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
          />
        </>
      ) : (
        <Check className={"size-5"} />
      )}
      <span>Partagez</span>
    </button>
  );
}
