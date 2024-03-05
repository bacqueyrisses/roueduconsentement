import { signout } from "@/lib/actions/auth";
import Check from "@/components/icons/check";
import X from "@/components/icons/x";

export default function Page() {
  return (
    <>
      <div>
        <div>Est-ce que j’ai demandé à l’autre si il en a envie ?</div>
        <div className={"flex items-center justify-center gap-4"}>
          <button
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-5 py-2 text-base font-medium text-green-600 transition-colors duration-300 ease-in-out hover:bg-green-300 hover:text-green-700 md:px-7"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>D'accord</span>
          </button>
          <button
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-5 py-2 text-base font-medium text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 md:px-7"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <X className={"size-6"} />
            <span>Pas d'accord</span>
          </button>
        </div>
      </div>
      <form action={signout}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}
