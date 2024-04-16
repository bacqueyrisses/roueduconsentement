import Link from "@/components/icons/link";

export default function LinksButton() {
  return (
    <button
      className={
        "inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2 text-base font-medium text-emerald-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 md:px-7 md:text-base"
      }
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      <Link className={"size-6"} />
      <span className="hidden md:block">Liens utiles</span>
      <span className="block md:hidden">Liens</span>
    </button>
  );
}
