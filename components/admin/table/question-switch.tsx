"use client";
import { QuestionQuery } from "@/app/admin/questions/page";
import { updateQuestion } from "@/lib/actions/rest";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionSwitch({
  id,
  active,
}: {
  id: QuestionQuery["id"];
  active: QuestionQuery["active"];
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
