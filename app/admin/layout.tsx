import "@/styles/tailwind.css";

import Nav from "@/components/admin/nav";
import { Suspense } from "react";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin: La roue du consentement",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
};
export const viewport: Viewport = {
  themeColor: "black",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="h-full bg-gray-50">
      <Suspense>
        <Nav />
      </Suspense>
      {children}
    </body>
  );
}
