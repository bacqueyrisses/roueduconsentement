import Footer from "@/components/footer";
import logo from "@/public/logo.png";
import { clash, inter } from "@/styles/fonts";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "La roue du consentement.",
  description: "Évaluez votre consentement à travers une série de questions.",
  openGraph: {
    title: "La roue du consentement.",
    description: "Évaluez votre consentement à travers une série de questions.",
  },
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <body className={`${clash.variable} ${inter.variable} h-full w-full`}>
      <Toaster
        offset={12}
        position={"top-center"}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: `${inter.variable} w-full inline-flex gap-1.5 items-center justify-center`,
          },
        }}
      />
      <div
        className={
          "fixed h-screen w-full bg-gradient-to-b from-fuchsia-100/80 via-teal-50 to-amber-100"
        }
      />
      <main
        className={
          "z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-between gap-4 px-2.5 py-4 md:gap-6"
        }
      >
        <section className={"flex w-full flex-col items-center justify-center"}>
          <Image
            src={logo}
            width={40}
            height={40}
            alt={"logo de la roue du consentement"}
            style={{ animationDelay: "0.10s", animationFillMode: "forwards" }}
            className={"mb-1 w-8 animate-fade-up opacity-0 md:w-11"}
          />
          <h1
            className={
              "inline-flex animate-fade-up flex-col bg-gradient-to-br from-gray-900 to-fuchsia-800/80 bg-clip-text text-center font-display text-3xl tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl"
            }
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <span>La roue du</span>
            <span className={"-mt-1"}>consentement</span>
          </h1>
        </section>
        {children}
        <Footer key={"footer"} />
      </main>
    </body>
  );
}
