import "@/styles/tailwind.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const clash = localFont({
  src: "../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  // metadataBase: new URL(""),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrolled = false;
  return (
    <html lang="en">
      <body className={`${clash.variable} ${inter.variable} h-screen w-full`}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-violet-100 via-teal-50 to-amber-100" />
        <main className="flex w-full flex-col items-center justify-center pt-6">
          {children}
        </main>
        <footer className="absolute bottom-0 w-full py-5 text-center">
          <p className="text-gray-500">
            Un projet de{" "}
            <a
              className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nom Prénom
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
