import NameDialog from "@/components/home/name-dialog";
import Wheel from "@/components/home/wheel";

export default function HomePage() {
  return (
    <>
      <section className={"flex w-full flex-col items-center gap-4"}>
        <p
          className="animate-fade-up text-center text-base text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit.
        </p>
        <NameDialog />
      </section>
      <section
        className="flex h-full w-full animate-fade-up items-center justify-center overflow-hidden opacity-0"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Wheel value={5} />
      </section>
    </>
  );
}
