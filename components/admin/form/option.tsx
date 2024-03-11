import { Button, Switch, TextInput } from "@tremor/react";
import React, { Dispatch, useState } from "react";
import Check from "@/components/icons/check";
import { useFormStatus } from "react-dom";
import { createOption } from "@/lib/actions/rest";
import { toast } from "sonner";
import X from "@/components/icons/x";

export default function OptionForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>;
}) {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <form
      action={(data) => {
        createOption(data)
          .then(() => {
            setIsOpen(false);
            toast(
              <div
                className={
                  "inline-flex items-center gap-1.5 rounded-full bg-green-200 px-5 py-2 text-base font-medium text-green-600 md:px-7"
                }
              >
                <Check />
                <h1>Nouvelle option créée</h1>
              </div>,
            );
          })
          .catch((error) =>
            toast(
              <div
                className={
                  "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 py-2 text-base font-medium text-red-600 md:px-7"
                }
              >
                <X />
                <h1>{error.message}</h1>
              </div>,
            ),
          );
      }}
      className="mx-auto max-w-sm space-y-8"
    >
      <div>
        <TextInput
          icon={Check}
          placeholder="Description"
          type={"text"}
          name={"description"}
        />
      </div>
      <div className="flex items-center space-x-3">
        <Switch
          id="switch"
          name="active"
          checked={isSwitchOn}
          onChange={(value) => setIsSwitchOn(value)}
        />
        <label
          htmlFor="switch"
          className="dark:text-dark-tremor-content text-tremor-default text-tremor-content"
        >
          Rendre l'option active
        </label>
      </div>
      <div className="mt-8 flex items-center justify-end space-x-2">
        <Button
          type={"button"}
          size="xs"
          variant="secondary"
          onClick={() => setIsOpen(false)}
        >
          Fermer
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" variant="primary" type={"submit"} loading={pending}>
      Créer l'option
    </Button>
  );
}
