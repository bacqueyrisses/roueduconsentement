"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";

export default function Search({ disabled }: { disabled?: boolean }) {
  return (
    <Suspense>
      <Searchbar disabled={disabled} />
    </Suspense>
  );
}
function Searchbar({ disabled }: { disabled?: boolean }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}` as Route);
    });
  }

  return (
    <div className={"relative mt-5 max-w-md"}>
      <label htmlFor="search" className={"sr-only"}>
        Search
      </label>
      <div className={"rounded-md shadow-sm"}>
        <div
          className={
            "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          }
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className={"mr-3 h-4 w-4 text-gray-400"}
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          className={
            "block h-10 w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          }
          placeholder="Recherchez..."
          spellCheck={false}
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isPending && (
        <div
          className={
            "absolute bottom-0 right-0 top-0 flex items-center justify-center"
          }
        >
          <svg
            className={"-ml-1 mr-3 h-5 w-5 animate-spin text-gray-700"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className={"opacity-25"}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className={"opacity-75"}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
