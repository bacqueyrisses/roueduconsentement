"use client";

import CancelButton from "@/components/buttons/cancel-button";
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

export default function NameDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    error &&
      toast(
        <div
          className={
            "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 py-2 text-base font-medium text-red-600 md:px-7"
          }
        >
          <X />
          <h1>{error}</h1>
        </div>,
      );
  }, [error]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7 md:text-base"
        }
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Check className={"size-5 md:size-6"} />
        <span>Faire le test</span>
      </button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form action={dispatch}>
          <DialogTitle>Rentrez votre pseudo</DialogTitle>
          <DialogDescription>
            Ce test est anonyme et aucune donnée nominative n’est conservée.
          </DialogDescription>
          <DialogBody>
            <Field>
              <Input
                type={"text"}
                name="pseudo"
                placeholder="pseudonyme"
                invalid={!!error}
              />
            </Field>
          </DialogBody>
          <DialogActions className={"mt-10"}>
            <CancelButton onClick={() => setIsOpen(false)} variant={"cancel"} />
            <SubmitButton />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("answeredQuestions");
        localStorage.removeItem("surveyCompleted");
        localStorage.removeItem("score");
      }}
      className={
        "relative rounded-full bg-emerald-100 px-5 py-2 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:px-7"
      }
    >
      {pending ? (
        <>
          <span className={"invisible"}>Jouer</span>
          <Loader
            className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
          />
        </>
      ) : (
        "Jouer"
      )}
    </button>
  );
}
