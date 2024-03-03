"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NameDialog() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="animate-fade-up mt-6 cursor-pointer rounded-full bg-blue-100 px-5 py-2 text-lg font-medium text-blue-600 transition-colors hover:bg-blue-200 md:px-7"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Faire le test
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
              "rounded-full bg-red-100 px-5 py-2 font-medium text-red-500 transition-colors hover:bg-red-200 md:px-7"
            }
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </button>
          <button
            className={
              "rounded-full bg-green-100 px-5 py-2 font-medium text-green-600 transition-colors hover:bg-green-200 md:px-7"
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
