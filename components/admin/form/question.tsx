import Check from "@/components/icons/check";
import { createQuestion } from "@/lib/actions/questions";
import { initialState } from "@/lib/utils";
import { Button, NumberInput, Switch, TextInput } from "@tremor/react";
import { Dispatch, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function QuestionForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>;
}) {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [state, dispatch] = useFormState(createQuestion, initialState);

  // Effect to handle useFormState success states
  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
      toast.success("Nouvelle question créée avec succès.");
    }
  }, [state?.success]);

  // Effect to handle useFormState error states
  useEffect(() => {
    if (state?.errors) {
      Object.keys(state.errors).forEach((key) =>
        toast.error(state.errors[key]),
      );
    }
  }, [state?.errors]);

  return (
    <form action={dispatch} className="mx-auto max-w-sm space-y-8">
      <div>
        <TextInput
          icon={Check}
          placeholder="Description"
          type={"text"}
          name={"description"}
        />
      </div>
      <div>
        <NumberInput
          icon={Check}
          placeholder="Valeur Oui"
          min={0}
          max={10}
          name={"value-one"}
        />
      </div>
      <div>
        <NumberInput
          icon={Check}
          placeholder="Valeur Non"
          min={0}
          max={10}
          name={"value-two"}
        />
      </div>
      <div>
        <NumberInput
          icon={Check}
          placeholder="Valeur Je ne sais pas"
          min={0}
          max={10}
          name={"value-three"}
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
          Rendre la question active
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
      Créer la question
    </Button>
  );
}
