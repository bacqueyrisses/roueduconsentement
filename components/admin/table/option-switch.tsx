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
        toast(
          <div
            className={
              "inline-flex items-center gap-1.5 rounded-full bg-green-200 px-5 py-2 text-base font-medium text-green-600 md:px-7"
            }
          >
            <Check />
            <h1>Option mise à jour</h1>
          </div>,
        );
      }}
    />
  );
}
