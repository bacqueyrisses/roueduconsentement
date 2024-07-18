"use client";
import { paths } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ visible }: { visible?: boolean }) {
  const pathname = usePathname();

  return (
    <footer
      className={`${pathname === paths.toWheel && !visible ? "hidden md:block" : pathname === paths.toHome ? "block" : "hidden xs:block md:hidden"} w-screen animate-fade-up text-balance text-center text-[0.65rem] tracking-tight opacity-0 md:text-[0.9rem]`}
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
    >
      <p className={"text-gray-500"}>
        Cette application a été réalisée par une équipe de recherche
        pluridisciplinaire dirigée par Anastasia Meidani, PU de sociologie à
        l’Université Toulouse Jean-Jaurès, en collaboration avec le Cette
        application a été réalisée par un collectif de chercheurs issu du{" "}
        <Link
          className={
            "inline-block bg-gradient-to-r from-black to-fuchsia-950 bg-clip-text font-medium text-transparent underline-offset-4 transition-colors hover:text-black hover:underline"
          }
          href="https://www.univ-tlse2.fr/accueil/formation-insertion/master-agapes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Master AGÂPÉS
        </Link>
        . <br />
        Application financée par la{" "}
        <Link
          className={
            "inline-block bg-gradient-to-r from-black to-fuchsia-950 bg-clip-text font-medium text-transparent underline-offset-4 transition-colors hover:text-black hover:underline"
          }
          href="https://www.firah.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firah
        </Link>
        . Réalisée par diodeproduction / troispetitspoints. Développement par{" "}
        <Link
          className={
            "inline-block bg-gradient-to-r from-black to-fuchsia-950 bg-clip-text font-medium text-transparent underline-offset-4 transition-colors hover:text-black hover:underline"
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
