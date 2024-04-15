"use client";

import { AnswersList } from "@/components/admin/list/answers";
import Message from "@/components/icons/message";
import { UserWithAnswers } from "@/lib/database/users";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { useState } from "react";

export default function AnswersDialog({ user }: { user: UserWithAnswers }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"flex"}>
      <button
        className={
          "dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted flex items-center justify-center gap-1.5 rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted"
        }
        onClick={() => setIsOpen(true)}
      >
        <Message className={"size-5"} /> Voir les réponses
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className={"z-[100]"}
      >
        <DialogPanel className={"max-w-6xl space-y-8"}>
          <div className={"mx-auto max-w-6xl space-y-8"}>
            <AnswersList user={user} />
          </div>
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
