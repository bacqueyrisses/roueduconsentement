import Navbar from "@/components/admin/navbar";
import "@/styles/tailwind.css";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
