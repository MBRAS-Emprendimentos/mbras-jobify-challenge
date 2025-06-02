'use client';
import { useState } from 'react';
import JobFilters from '@/components/JobFilters';
import JobCardList from '@/components/JobCardList';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [filters, setFilters] = useState({});


  
  return (
    <main className="bg-zinc-50 dark:bg-[#0f0f1a] text-zinc-900 dark:text-zinc-100 min-h-screen">
      {/* Theme toggle fixo no topo da tela */}
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <section className="relative border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151624] py-8 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            JOBIFY
          </h1>
        </div>
      </section>


      {/* filtros e listagem de vagas */}
      <section className="w-full border-b border-zinc-200 dark:border-zinc-800">
        {/* filtros no topo (desktop e mobile) */}
        <JobFilters onFilterChange={setFilters} />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex-1">
          <JobCardList filters={filters} />
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
