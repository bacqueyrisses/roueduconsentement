import Nav from "@/components/admin/nav";
import { inter } from "@/styles/fonts";
import "@/styles/tailwind.css";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin | La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
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
