import "@/styles/tailwind.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Instagram from "@/components/icons/instagram";
import Link from "next/link";
import { Toaster } from "sonner";

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

export const viewport: Viewport = {
  themeColor: "#EDF3FD",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
          <div className="z-10 flex w-full max-w-xl flex-col items-center justify-center px-2.5 xl:px-0">
            <Link
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-orange-500/20 px-5 py-2 transition-colors duration-300 ease-in-out hover:bg-orange-200 md:px-7"
            >
              <Instagram className="size-4 text-orange-500" />
            </Link>
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
    </html>
  );
}
