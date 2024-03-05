import { signout } from "@/lib/actions/auth";
import Check from "@/components/icons/check";

export default function Page() {
  return (
    <>
      <div>
        <div>Est-ce que j’ai demandé à l’autre si il en a envie ?</div>
        <div className={"flex items-center justify-center gap-4"}>
          <button
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>Se tester maintenant</span>
          </button>
          <button
            className="mt-6 inline-flex animate-fade-up cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-5 py-2 text-base font-medium text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 md:px-7"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Check className={"size-6"} />
            <span>Se tester maintenant</span>
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
