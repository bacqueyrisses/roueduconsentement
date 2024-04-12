import { ReactNode } from "react";
import { User } from "next-auth";

export async function retry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> {
  let attempts: number = 0;

  while (attempts < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Maximum number of retry attempts reached.");
}

// This is temporary until @types/react-dom is updated
export const initialState: any = {};
export type PrevState = any;

export function Highlight({
  children,
  score,
  className,
}: {
  children: ReactNode;
  className?: string;
  score?: User["score"];
}) {
  return (
    <span
      className={`px-1 py-0.5 font-bold ${!score ? "bg-emerald-100 text-emerald-700" : score === 0 ? "" : score <= 4 ? "bg-red-100 text-red-700" : score <= 7 ? "bg-yellow-100 text-yellow-700" : "bg-emerald-100 text-emerald-700"} ${className}`}
    >
      {children}
    </span>
  );
}
