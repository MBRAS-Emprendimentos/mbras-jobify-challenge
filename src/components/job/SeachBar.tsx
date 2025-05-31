"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("search") ?? "");
  const debounced = useDebounce(query);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (debounced) url.searchParams.set("search", debounced);
    else url.searchParams.delete("search");
    router.push(url.pathname + url.search);
  }, [debounced, router]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Pesquisar por título ou descrição…"
      className="w-full rounded-2xl border px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
    />
  );
}
