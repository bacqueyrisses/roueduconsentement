import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export const viewport: Viewport = {
  themeColor: "#EDF3FD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en">{children}</html>;
}
