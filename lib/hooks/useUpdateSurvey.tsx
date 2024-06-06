import { updateSession } from "@/lib/actions/auth";
import JSConfetti from "js-confetti";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useUpdateSurvey() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const jsConfetti = new JSConfetti();

  return useCallback(() => {
    void updateSession({ surveyCompleted: true });

    const params = new URLSearchParams(searchParams);
    params.set("surveyCompleted", "true");
    replace(`${pathname}?${params.toString()}` as Route);
    localStorage.setItem("surveyCompleted", "true");

    setTimeout(() => {
      void jsConfetti.addConfetti({
        emojis: ["💟"],
        confettiNumber: 75,
        emojiSize: 60,
      });
    }, 1000);
  }, [pathname]);
}
