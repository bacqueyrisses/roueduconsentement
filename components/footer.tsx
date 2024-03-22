import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-screen animate-fade-up p-4 px-10 text-center text-[0.65rem] tracking-tight opacity-0 md:text-[0.9rem]"
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
        . <br />
        Projet financé par la{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.firah.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firah
        </Link>
        . Développement par{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
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
