import Book from "@/components/icons/book";

export default function DefinitionButton() {
  return (
    <button
      className={
        "inline-flex w-fit animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200/80 px-5 py-2 text-sm font-medium text-yellow-700 opacity-0 transition-colors duration-300 ease-in-out hover:bg-yellow-300/80 hover:text-yellow-800 md:px-7 md:text-base"
      }
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    >
      <Book className={"size-5 md:size-6"} />
      <span>Définition du consentement</span>
    </button>
  );
}
