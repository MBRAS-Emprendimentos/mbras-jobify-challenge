"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  slug: string;
  name: string;
}

export default function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs/categories")
      .then((r) => r.json())
      .then((json) => setCategories(json.jobs));
  }, []);

  const current = params.get("category") ?? "";

  function handleChange(cat: string) {
    const url = new URL(window.location.href);
    if (cat) url.searchParams.set("category", cat);
    else url.searchParams.delete("category");

    router.push(url.pathname + url.search, { scroll: false });
  }
  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-2xl border px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
    >
      <option value="">Todas as categorias</option>
      {categories.map((c) => (
        <option key={c.slug} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
