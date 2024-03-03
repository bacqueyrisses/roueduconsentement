import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full py-5 text-center">
      <p className="text-gray-500">
        Un projet de{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          auteur.e
        </Link>
      </p>
    </footer>
  );
}
