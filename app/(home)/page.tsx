import NameDialog from "@/components/home/name-dialog";
import Wheel from "@/components/home/wheel";
import Check from "@/components/icons/check";

export default function HomePage() {
  return (
    <>
      <section className={"flex w-full flex-col items-center gap-4"}>
        <p
          className="animate-fade-up text-center text-base text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Un doute sur la situation que tu es en train de vivre ? Évalue ton
          niveau de consentement en 10 questions grâce à cette appli ! (autant
          de fois que nécessaire)
        </p>
        <div className={"space-x-2"}>
          <NameDialog />
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>Définition du consentement</span>
          </button>
          <button
            className="inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 opacity-0 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
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
