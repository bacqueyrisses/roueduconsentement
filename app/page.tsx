import NameDialog from "@/components/name-dialog";
import WheelWrapper from "@/components/wheel-wrapper";
import Wheel from "@/components/wheel";

export default function Home() {
  return (
    <>
      <p
        className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <NameDialog />
      <Wheel value={20} />
    </>
  );
}
