import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const clash = localFont({
  src: "./ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
