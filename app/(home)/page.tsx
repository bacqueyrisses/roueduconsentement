import NameDialog from "@/components/home/name-dialog";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";
import { Highlight } from "@/lib/utils";
import Book from "@/components/icons/book";
import Link from "@/components/icons/link";

export default function HomePage() {
  return (
    <>
      <section className={"flex w-full flex-col items-center gap-6"}>
        <p
          className="animate-fade-up text-center text-base text-gray-500 opacity-0 [text-wrap:balance] md:text-lg"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Un doute sur la situation que tu es en train de vivre ?{" "}
          <Highlight>
            Évalue ton niveau de consentement en 10 questions
          </Highlight>{" "}
          grâce à cette appli ! (autant de fois que nécessaire)
        </p>
        <div className={"space-x-2"}>
          <NameDialog />
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200/80 px-5 py-2 text-base font-medium text-yellow-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-yellow-300/80 hover:text-yellow-800 md:px-7"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Book className={"size-6"} />
            <span>Définition du consentement</span>
          </button>
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:px-7 md:text-base"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Link className={"size-6"} />
            <span>Liens utiles</span>
          </button>
        </div>
      </section>
      <section
        className="flex h-full w-full animate-fade-up items-center justify-center overflow-hidden opacity-0 p-6"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={5} />
      </section>
    </>
  );
}
