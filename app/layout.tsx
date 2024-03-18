import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export const viewport: Viewport = {
  themeColor: "#EDF3FD",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={"select-none h-dvh"}>
      {children}
    </html>
  );
}
