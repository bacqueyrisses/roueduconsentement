"use client";

import { updateOption } from "@/lib/actions/rest";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

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
