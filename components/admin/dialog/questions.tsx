"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  NumberInput,
  Switch,
  TextInput,
} from "@tremor/react";
import React, { useState } from "react";
import Plus from "@/components/icons/plus";
import Check from "@/components/icons/check";

export default function QuestionsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <div className="relative mt-5 flex h-10 justify-center">
      <button
        className="dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted flex items-center justify-center gap-1.5 rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted"
        onClick={() => setIsOpen(true)}
      >
        <Plus className={"size-5"} /> Nouvelle question
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="max-w-sm space-y-8">
          <div className="mx-auto max-w-sm space-y-8">
            <div>
              <TextInput icon={Check} placeholder="Description" type={"text"} />
            </div>
            <div>
              <NumberInput icon={Check} placeholder="Valeur" min={0} max={10} />
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="switch"
                name="switch"
                checked={isSwitchOn}
                onChange={(value) => setIsSwitchOn(value)}
              />
              <label
                htmlFor="switch"
                className="dark:text-dark-tremor-content text-tremor-default text-tremor-content"
              >
                Rendre la question active
              </label>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end space-x-2">
            <Button
              size="xs"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </Button>
            <Button size="xs" variant="primary" type={"submit"}>
              Créer la question
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
