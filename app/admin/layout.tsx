import { inter } from "@/styles/fonts";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return (
    <body className="h-full w-full bg-gray-50">
      <Toaster
        position={"bottom-center"}
        toastOptions={{
          classNames: {
            toast: `${inter.variable} flex gap-1.5 items-center justify-center z-100`,
          },
        }}
      />
      {children}
    </body>
  );
}
