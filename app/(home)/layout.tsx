import logo from "@/public/logo.png";
import { clash, inter } from "@/styles/fonts";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Jouez | La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <body className={`${clash.variable} ${inter.variable} h-full w-full`}>
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
      <main className="z-10 flex h-full w-full max-w-2xl flex-col items-center justify-start gap-6 px-2.5 pt-6 xl:px-0">
        <section className={"flex flex-col items-center justify-center"}>
          <Image
            src={logo}
            width={33}
            height={33}
            alt={"logo de la roue du consentement"}
            style={{ animationDelay: "0.10s", animationFillMode: "forwards" }}
            className={"mb-3 animate-fade-up opacity-0"}
          />
          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            La roue du consentement
          </h1>
        </section>
        {children}
      </main>
      <Footer />
    </body>
  );
}
