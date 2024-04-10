"use client";

import Check from "@/components/icons/check";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions/auth";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import CardStackWrapper from "@/components/home/results-stack";

export default function DetailsDialog({
  surveyCompleted,
  initial,
  score,
  answers,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Check className={"size-6"} />
        <span>Détail des réponses</span>
      </button>

      {isOpen && (
        <div
          className={
            "z-10 absolute left-1/2 -translate-x-1/2 flex w-full h-full"
          }
        >
          <CardStackWrapper
            initial={initial}
            answers={answers}
            surveyCompleted={
              localStorage.getItem("surveyCompleted") || surveyCompleted
            }
            score={score}
          />
        </div>
      )}
    </>
  );
}
