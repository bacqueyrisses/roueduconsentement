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
import { Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions/auth";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function SurveyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, dispatch] = useFormState(authenticate, undefined);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleClose() {
    setIsOpen((prevState) => !prevState);
    const params = new URLSearchParams(searchParams);

    params.delete("initial");
    replace(`${pathname}?${params.toString()}` as Route);
  }

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
        className="z-100 absolute right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 py-1 font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-300 ease-in-out hover:bg-emerald-200 px-3"
        style={{
          animationDelay: "0.3s",
          animationFillMode: "forwards",
        }}
      >
        <Check className={"size-5"} />

        <span>Répondre</span>
      </button>
      <Dialog open={isOpen} onClose={handleClose}>
        <form
          onClick={() => {
            setIsOpen((prevState) => !prevState);
            const params = new URLSearchParams(searchParams);

            params.set("surveyCompleted", "true");
            params.delete("initial");
            replace(`${pathname}?${params.toString()}` as Route);
            localStorage.setItem("surveyCompleted", "true");
          }}
        >
          <DialogTitle>Répondez à quelques questions</DialogTitle>
          <DialogDescription>
            Ce test est anonyme et aucune donnée nominative n’est conservée.
          </DialogDescription>
          <DialogBody className={"space-y-4"}>
            <Field>
              <Label>Âge</Label>
              <Input
                type={"text"}
                name="age"
                placeholder="Quel âge avez vous ?"
              />
            </Field>
            <Field>
              <Label>Question</Label>
              <Input type={"text"} name="question" placeholder="Question" />
            </Field>
            <Field>
              <Label>Question</Label>
              <Input type={"text"} name="question" placeholder="Question" />
            </Field>
            <Field>
              <Label>Question</Label>
              <Input type={"text"} name="question" placeholder="Question" />
            </Field>
          </DialogBody>
          <DialogActions className={"mt-10"}>
            <button
              type={"button"}
              className={
                "rounded-full bg-red-100 px-5 py-2 font-medium text-red-600 transition-colors duration-300 ease-in-out hover:bg-red-200 md:px-7"
              }
              onClick={handleClose}
            >
              Annuler
            </button>

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
      className={
        "relative hover:bg-emerald-200 text-emerald-700 bg-emerald-100 hover:text-emerald-800relative rounded-full px-5 py-2 font-medium transition-colors duration-300 ease-in-out md:px-7"
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
        "Partagez"
      )}
    </button>
  );
}
