"use client";

import { authenticateAdmin } from "@/lib/actions/auth";
import { Button, TextInput } from "@tremor/react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function AdminLoginForm() {
  const [error, dispatch] = useFormState(authenticateAdmin, undefined);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="dark:text-dark-tremor-content-strong text-center text-tremor-title font-semibold text-tremor-content-strong">
          Espace Admin | Connectez vous
        </h1>

        <form action={dispatch} className="mt-6">
          <label
            htmlFor="email"
            className="dark:text-dark-tremor-content-strong text-tremor-default font-medium text-tremor-content-strong"
          >
            Email
          </label>
          <TextInput
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="consentement@email.com"
            className="mt-2"
            error={!!error}
          />
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="*********"
            className="mt-2"
            error={!!error}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending}
      type="submit"
      className="dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis"
    >
      Se connecter
    </Button>
  );
}
