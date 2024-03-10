import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="absolute bottom-0 w-full animate-fade-up py-5 text-center tracking-tight opacity-0"
      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
    >
      <p className="text-gray-500">
        Cette application a été réalisée par un collectif de chercheurs issu du
        Master AGAPES de{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.univ-tlse2.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          l’université Toulouse Jean Jaurès
        </Link>
        . Projet financé par la{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.firah.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firah
        </Link>
        .
      </p>
    </footer>
  );
}
