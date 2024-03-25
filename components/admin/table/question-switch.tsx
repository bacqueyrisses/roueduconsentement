"use client";
import { updateQuestion } from "@/lib/actions/questions";
import { QuestionByDescription } from "@/lib/database/questions";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionSwitch({
  id,
  active,
}: {
  id: QuestionByDescription["id"];
  active: QuestionByDescription["active"];
}) {
  const [isSwitchOn, setIsSwitchOn] = useState(active);

  return (
    <Switch
      key={id}
      id="switch"
      name="active"
      checked={isSwitchOn}
      onChange={(value) => {
        setIsSwitchOn(value);
        updateQuestion(id, value)
          .then(() => toast.success("Question mise à jour avec succès."))
          .catch((error) =>
            toast.error("Une erreur est survenue. Réessayez.."),
          );
      }}
    />
  );
}
