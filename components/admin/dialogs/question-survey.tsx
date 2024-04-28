"use client";

import Message from "@/components/icons/message";
import { User } from "@prisma/client";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { useState } from "react";

export default function QuestionSurveyDialog({
  question,
}: {
  question: User["question"];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"flex"}>
      <button
        className={
          "dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted flex items-center justify-center gap-1.5 rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted"
        }
        onClick={() => setIsOpen(true)}
      >
        <Message className={"size-5"} /> Voir la réponse
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className={"z-[100]"}
      >
        <DialogPanel className={"h-fit max-w-6xl"}>
          <div className={"h-fit w-fit break-all"}>{question}</div>

          <div className={"mt-8 flex items-center justify-end space-x-2"}>
            <Button
              size="xs"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
