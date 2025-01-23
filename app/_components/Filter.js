"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    // console.log(filter);
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: "false" });
  }

  const activeFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className="border border-primary-800 flex">
      <button
        onClick={() => handleFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" && "bg-primary-700"
        }`}
      >
        All cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" && "bg-primary-700"
        }`}
      >
        1&mdash;4 guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" && "bg-primary-700"
        }`}
      >
        4&mdash;7 guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" && "bg-primary-700"
        }`}
      >
        8&mdash;10 guests
      </button>
    </div>
  );
}

export default Filter;
