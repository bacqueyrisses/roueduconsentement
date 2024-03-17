import { inter } from "@/styles/fonts";
import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export const viewport: Viewport = {
  themeColor: "#EDF3FD",
};

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return (
    <body className="h-screen w-full bg-gray-50">
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
