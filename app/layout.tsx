import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | 🌀 La roue du consentement",
    default: "🌀 La roue du consentement",
  },
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  metadataBase: new URL("https://consentement.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#EDF3FD",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={"h-dvh select-none"}>
      {children}
    </html>
  );
}
