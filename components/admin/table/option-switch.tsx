"use client";
import { Switch } from "@tremor/react";
import { useEffect, useState } from "react";
import { updateOption, updateQuestion } from "@/lib/actions/rest";
import { toast } from "sonner";
import Check from "@/components/icons/check";

export default function OptionSwitch({ id, active }) {
  const [isSwitchOn, setIsSwitchOn] = useState(active);

  return (
    <Switch
      key={id}
      id="switch"
      name="active"
      checked={isSwitchOn}
      onChange={(value) => {
        setIsSwitchOn(value);
        void updateOption(id, value);
        toast.success("Option mise à jour avec succès.");
      }}
    />
  );
}
