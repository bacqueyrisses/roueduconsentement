"use client";

import QuestionForm from "@/components/admin/form/question";
import Plus from "@/components/icons/plus";
import { Dialog, DialogPanel } from "@tremor/react";
import { useState } from "react";

export default function QuestionsDialog({ disabled }: { disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-5 flex h-10 justify-center">
      <button
        className="dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted flex items-center justify-center gap-1.5 rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
      >
        <Plus className={"size-5"} /> Nouvelle question
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(true)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="max-w-sm space-y-8">
          <QuestionForm setIsOpen={setIsOpen} />
        </DialogPanel>
      </Dialog>
    </div>
  );
}
