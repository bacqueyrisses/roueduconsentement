"use client";
import { updateQuestion } from "@/lib/actions/rest";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionSwitch({ id, active }) {
  const [isSwitchOn, setIsSwitchOn] = useState(active);

  return (
    <Switch
      key={id}
      id="switch"
      name="active"
      checked={isSwitchOn}
      onChange={(value) => {
        setIsSwitchOn(value);
        void updateQuestion(id, value);
        toast.success("Question mise à jour avec succès.");
      }}
    />
  );
}
