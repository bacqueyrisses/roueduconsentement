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
import { useState } from "react";
import Check from "@/components/icons/check";

export default function NameDialog() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Check className={"size-6"} />
        <span>Se tester maintenant</span>
      </button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Rentrez votre pseudo</DialogTitle>
        <DialogDescription>
          Ce test est anonyme et aucune donnée nominative n’est conservée.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Input type={"text"} name="pseudo" placeholder="pseudonyme" />
          </Field>
        </DialogBody>
        <DialogActions>
          <button
            className={
              "rounded-full bg-red-100 px-5 py-2 font-medium text-red-600 transition-colors duration-300 ease-in-out hover:bg-red-200 md:px-7"
            }
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </button>
          <button
            className={
              "rounded-full bg-green-100 px-5 py-2 font-medium text-green-700 transition-colors duration-300 ease-in-out hover:bg-green-200 md:px-7"
            }
            onClick={() => setIsOpen(false)}
          >
            Jouer
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
