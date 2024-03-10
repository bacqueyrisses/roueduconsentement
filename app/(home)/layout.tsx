import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Image from "next/image";

import logo from "@/public/logo.png";

import { Toaster } from "sonner";

const clash = localFont({
  src: "../../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
  return (
    <body className={`${clash.variable} ${inter.variable} h-screen w-full`}>
      <Toaster
        offset={24}
        position={"top-center"}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: `${inter.variable} w-full inline-flex gap-1.5 items-center justify-center`,
          },
        }}
      />
      <div className="fixed h-screen w-full bg-gradient-to-br from-violet-100 via-teal-50 to-amber-100" />
      <main className="flex w-full flex-col items-center justify-center pt-6">
        <div className="z-10 flex w-full max-w-2xl flex-col items-center justify-center px-2.5 xl:px-0">
          <Image
            src={logo}
            width={33}
            height={33}
            alt={"logo de la roue du consentement"}
            className={"mb-3 animate-fade-up"}
          />
          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-6xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            La roue du consentement
          </h1>
          {children}
        </div>
      </main>
      <Footer />
    </body>
  );
}
