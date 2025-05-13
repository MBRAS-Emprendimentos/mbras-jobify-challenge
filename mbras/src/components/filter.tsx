"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filter({
  categories,
}: {
  categories: { name: string; slug: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get("category") ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (selected) {
      newParams.set("category", selected);
    } else {
      newParams.delete("category");
    }

    newParams.set("page", "1");

    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="mb-6">
      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
        Filtrar por cargo
      </label>
      <select
        id="category"
        name="category"
        value={currentCategory}
        onChange={handleChange}
        className="block w-1xl px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 cursor-pointer"
      >
        <option value="">Todos</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
