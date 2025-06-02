'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

type Filters = {
  category?: string;
  title?: string;
};

// slugs da API Remotive
const categories = [
  { name: 'Software Dev', slug: 'software-dev' },
  { name: 'Customer Support', slug: 'customer-support' },
  { name: 'Design', slug: 'design' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Sales / Business', slug: 'sales-business' },
  { name: 'Product', slug: 'product' },
  { name: 'Project Management', slug: 'project-management' },
  { name: 'Data Analysis', slug: 'data' },
  { name: 'DevOps / Sysadmin', slug: 'devops' },
  { name: 'Finance / Legal', slug: 'finance-legal' },
  { name: 'HR', slug: 'hr' },
  { name: 'QA', slug: 'qa' },
  { name: 'Writing', slug: 'writing' },
  { name: 'All others', slug: 'all-others' },
];

export default function JobFilters({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) {
  const [category, setCategory] = useState('');
  const [titleSearch, setTitleSearch] = useState('');
  const [debouncedTitle, setDebouncedTitle] = useState('');
  const isFirstRender = useRef(true);

  // debounce da barra de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(titleSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [titleSearch]);

  // dispara filtros quando title/category mudarem
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onFilterChange({
      title: debouncedTitle,
      category: category || undefined,
    });
  }, [debouncedTitle, category]);

  return (
    <section className="w-full px-4 md:px-8 py-8 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto">
        {/* barrra de busca */}
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />

            {/* Botão X para limpar busca */}
            {titleSearch && (
              <button
                onClick={() => setTitleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}

            <input
              type="text"
              placeholder="Pesquise por cargo, tecnologia, etc..."
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 text-center"
            />
          </div>


        {/* filtro categorias */}
        <div className="w-full max-w-2xl">
          <p className="text-center text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Categoria</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategory(cat.slug === category ? '' : cat.slug)}
                className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                  category === cat.slug
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
