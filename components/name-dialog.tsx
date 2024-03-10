"use client";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Check from "@/components/icons/check";
import { authenticate } from "@/lib/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import Loader from "@/components/icons/loader";
import { toast } from "sonner";
import X from "@/components/icons/x";

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
        className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Check className={"size-6"} />
        <span>Se tester maintenant</span>
      </button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form action={dispatch}>
          <DialogTitle>Rentrez votre pseudo</DialogTitle>
          <DialogDescription>
            Ce test est anonyme et aucune donnée nominative n’est conservée.
          </DialogDescription>
          <DialogBody>
            <Field>
              <Input type={"text"} name="pseudo" placeholder="pseudonyme" />
            </Field>
          </DialogBody>
          <DialogActions className={"mt-10"}>
            <button
              type={"button"}
              className={
                "rounded-full bg-red-100 px-5 py-2 font-medium text-red-600 transition-colors duration-300 ease-in-out hover:bg-red-200 md:px-7"
              }
              onClick={() => {
                setIsOpen(false);
              }}
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
        "relative rounded-full bg-green-100 px-5 py-2 font-medium text-green-700 transition-colors duration-300 ease-in-out hover:bg-green-200 md:px-7"
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
