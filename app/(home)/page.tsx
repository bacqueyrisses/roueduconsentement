import DefinitionButton from "@/components/buttons/definition";
import LinksButton from "@/components/buttons/links";
import NameDialog from "@/components/home/name-dialog";
import Wheel from "@/components/home/wheel";
import { Highlight } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className={"flex w-full flex-col items-center gap-6"}>
        <p
          className="animate-fade-up text-balance text-center text-base text-gray-500 opacity-0 md:text-lg"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Un doute sur la situation que tu es en train de vivre ?{" "}
          <Highlight>
            Évalue ton niveau de consentement en 10 questions
          </Highlight>{" "}
          grâce à cette appli ! (autant de fois que nécessaire) 🤍
        </p>
        <div className={"space-x-2"}>
          <NameDialog />
          <DefinitionButton />
          <LinksButton />
        </div>
      </section>
      <section
        className="flex h-full w-full animate-fade-up items-center justify-center overflow-hidden p-6 opacity-0"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={5} />
      </section>
    </>
  );
}
