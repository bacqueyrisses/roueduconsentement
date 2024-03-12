"use client";
import { Switch } from "@tremor/react";
import { useEffect, useState } from "react";
import { updateQuestion } from "@/lib/actions/rest";
import { toast } from "sonner";
import Check from "@/components/icons/check";

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
