import CancelButton from "@/components/buttons/cancel-button";
import Check from "@/components/icons/check";
import Loader from "@/components/icons/loader";
import X from "@/components/icons/x";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Label } from "@/components/ui/fieldset";
import { Radio, RadioField, RadioGroup } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { updateSession } from "@/lib/actions/auth";
import { addSurvey } from "@/lib/actions/users";
import { Highlight, initialState } from "@/lib/utils";
import JSConfetti from "js-confetti";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function SurveyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useFormState(addSurvey, initialState);
  const [gender, setGender] = useState("femme");
  const [otherGender, setOtherGender] = useState("");

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const jsConfetti = new JSConfetti();

  function handleClose() {
    setIsOpen((prevState) => !prevState);
  }

  // Effect to handle useFormState success states
  useEffect(() => {
    if (state?.success) {
      void updateSession({ surveyCompleted: true });

      const params = new URLSearchParams(searchParams);
      params.set("surveyCompleted", "true");
      replace(`${pathname}?${params.toString()}` as Route);
      localStorage.setItem("surveyCompleted", "true");

      setIsOpen(false);
      setTimeout(() => {
        void jsConfetti.addConfetti({
          emojis: ["🤍"],
          confettiNumber: 75,
          emojiSize: 80,
        });
      }, 1000);
    }
  }, [state?.success]);

  // Effect to handle useFormState error states
  useEffect(() => {
    if (state?.errors) {
      Object.keys(state.errors).forEach((key) => {
        toast(
          <div
            className={
              "inline-flex items-center gap-1.5 rounded-full bg-red-200 px-5 py-2 text-base font-medium text-red-600 md:px-7"
            }
          >
            <X />
            <h1>{state.errors[key]}</h1>
          </div>,
        );
      });
    }
  }, [state?.errors]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          "right-4 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800"
        }
        style={{
          animationDelay: "0.3s",
          animationFillMode: "forwards",
        }}
      >
        <Check className={"size-5"} />

        <span>Répondre</span>
      </button>
      <Dialog
        className={"translate-y-[72px]"}
        open={isOpen}
        onClose={handleClose}
      >
        <form action={dispatch}>
          <DialogTitle>
            Pour nous aider à{" "}
            <Highlight className={"text-emerald-800"}>
              améliorer cette appli
            </Highlight>
            , merci de répondre à ces trois questions.
          </DialogTitle>
          <DialogDescription>
            Ce test est anonyme et aucune donnée nominative n’est conservée.
          </DialogDescription>
          <DialogBody className={"space-y-4"}>
            <Field>
              <Label>Âge</Label>
              <Input
                type={"number"}
                name="age"
                placeholder="Quel âge as tu ?"
                min={0}
                required
                invalid={!!state?.errors?.age}
              />
            </Field>
            <Field>
              <Label>Genre</Label>
              <RadioGroup name="gender" defaultValue={gender}>
                <RadioField>
                  <Radio value="femme" onClick={() => setGender("female")} />
                  <Label className={"cursor-pointer"}>Femme</Label>
                </RadioField>
                <RadioField>
                  <Radio value="homme" onClick={() => setGender("male")} />
                  <Label className={"cursor-pointer"}>Homme</Label>
                </RadioField>
                <RadioField>
                  <Radio value="other" onClick={() => setGender("other")} />
                  {gender === "other" ? (
                    <input
                      type="text"
                      name="otherGender"
                      value={otherGender}
                      onChange={(e) => setOtherGender(e.target.value)}
                      placeholder="Précisez"
                      className={"w-fit text-base/6 outline-none sm:text-sm/6"}
                      required={gender === "other"}
                    />
                  ) : (
                    <Label className={"cursor-pointer"}>Autre</Label>
                  )}
                </RadioField>
              </RadioGroup>
            </Field>
            <Field>
              <Label>
                Quelles raisons t’ont amené.e à utiliser l’application ?
              </Label>
              <Textarea
                resizable={false}
                name="question"
                placeholder="Question ouverte"
              />
            </Field>
          </DialogBody>
          <DialogActions className={"mt-10"}>
            <CancelButton onClick={() => setIsOpen(false)} variant={"cancel"} />
            <SubmitButton />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={
        "hover:text-emerald-800relative relative rounded-full bg-emerald-100 px-5 py-2 font-medium text-emerald-700 transition-colors duration-300 ease-in-out hover:bg-emerald-200 md:px-7"
      }
    >
      {pending ? (
        <>
          <span className={"invisible"}>Partagez</span>
          <Loader
            className={"absolute inset-0 m-auto size-5 animate-spin-slow"}
          />
        </>
      ) : (
        "Partagez"
      )}
    </button>
  );
}
