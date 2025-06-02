"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("search") ?? "");
  const debounced = useDebounce(query);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debounced === (params.get("search") ?? "")) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const url = new URL(window.location.href);
    if (debounced) url.searchParams.set("search", debounced);
    else url.searchParams.delete("search");

    router.push(url.pathname + url.search, { scroll: false });

    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [debounced, router, params]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-indigo-600 text-xl font-semibold animate-pulse">
            Carregando...
          </div>
        </div>
      )}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar por título ou descrição…"
        className="w-full rounded-2xl border px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />
    </>
  );
}
