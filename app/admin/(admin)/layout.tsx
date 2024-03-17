import Navbar from "@/components/admin/navbar";
import "@/styles/tailwind.css";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin | La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
