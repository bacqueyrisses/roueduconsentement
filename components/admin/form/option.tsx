import Check from "@/components/icons/check";
import { createOption } from "@/lib/actions/rest";
import { Button, Switch, TextInput } from "@tremor/react";
import { Dispatch, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

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
            toast.success("Nouvelle option créée avec succès.");
          })
          .catch((error) => toast.error(error.message));
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
