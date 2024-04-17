"use client";
import { paths } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ visible }: { visible?: boolean }) {
  const pathname = usePathname();

  return (
    <footer
      className={`${pathname === paths.toWheel && !visible ? "hidden md:block" : pathname === paths.toHome ? "block" : "block md:hidden"} w-screen animate-fade-up text-center text-[0.65rem] tracking-tight opacity-0 md:text-[0.9rem]`}
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
    >
      <p className={"text-gray-500"}>
        Cette application a été réalisée par un collectif de chercheurs issu du
        Master AGAPES de{" "}
        <Link
          className={
            "font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          }
          href="https://www.univ-tlse2.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          l’université Toulouse Jean Jaurès
        </Link>
        . <br />
        Projet financé par la{" "}
        <Link
          className={
            "font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          }
          href="https://www.firah.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firah
        </Link>
        . Réalisé par diodeproduction / troispetitspoints. Développement par{" "}
        <Link
          className={
            "font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          }
          href="https://www.enzo.codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enzo Bacqueyrisses
        </Link>
        .
      </p>
    </footer>
  );
}
