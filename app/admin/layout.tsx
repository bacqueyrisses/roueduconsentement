import "@/styles/tailwind.css";

import Nav from "@/components/admin/nav";
import { Suspense } from "react";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Admin: La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="h-full bg-gray-50">
      <Toaster
        position={"bottom-center"}
        toastOptions={{
          classNames: {
            toast: `${inter.variable} max-w-max inline-flex gap-1.5 items-center justify-center z-100`,
          },
        }}
      />
      <Suspense>
        <Nav />
      </Suspense>
      {children}
    </body>
  );
}
