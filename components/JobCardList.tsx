'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useJobs } from '@/context/JobsContext';
import Loader from './Loader';
import { motion, AnimatePresence } from 'framer-motion';

const searchDictionary: Record<string, string> = {
  desenvolvedor: 'developer',
  programador: 'developer',
  front: 'frontend',
  back: 'backend',
  dados: 'data',
  mobile: 'mobile',
  devops: 'devops',
  react: 'react',
  vue: 'vue',
  angular: 'angular',
  brasil: 'brazil',
  remoto: 'remote',
};

function translateSearch(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => searchDictionary[word] || word)
    .join(' ');
}

type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  description?: string;
  url: string;
};

type Filters = {
  category?: string;
  title?: string;
};

export default function JobCardList({ filters }: { filters: Filters }) {
  const { jobs, setJobs } = useJobs();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const jobsPerPage = 15;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        const searchQuery = filters.title ? translateSearch(filters.title) : '';
        if (searchQuery) params.append('search', searchQuery);
        if (filters.category) params.append('category', filters.category);

        const response = await fetch(`https://remotive.com/api/remote-jobs?${params.toString()}`);
        const data = await response.json();

        const filtered = data.jobs.sort((a: Job, b: Job) => {
          const search = searchQuery.toLowerCase();
          const aScore = (a.title.toLowerCase().includes(search) ? 2 : 0) +
                         (a.description?.toLowerCase().includes(search) ? 1 : 0);
          const bScore = (b.title.toLowerCase().includes(search) ? 2 : 0) +
                         (b.description?.toLowerCase().includes(search) ? 1 : 0);
          return bScore - aScore;
        });

        setJobs(filtered);
        setCurrentPage(1);
      } catch (err) {
        console.error('Erro ao buscar vagas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters.title, filters.category]);

  useEffect(() => {
    if (filters.title || filters.category) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [filters.title, filters.category]);

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6 mt-4">
      {isLoading ? (
        <Loader />
      ) : currentJobs.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400">Nenhuma vaga encontrada.</p>
      ) : (
        <>
          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="text-sm text-zinc-500 dark:text-zinc-400 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {jobs.length} resultado{jobs.length !== 1 && 's'}
              </motion.div>
            )}
          </AnimatePresence>

          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[#151624] border border-indigo-200 dark:border-[#272738] rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">{job.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">{job.company_name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">{job.job_type}</span>
                    <span className="bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full max-w-[300px] truncate">
                      {job.candidate_required_location}
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                      Publicada em {new Date(job.publication_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/vaga/${job.id}`}
                  className="text-sm text-indigo-400 hover:text-indigo-300 whitespace-nowrap sm:ml-4 sm:self-start self-end"
                >
                  Ver vaga →
                </Link>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center gap-4 mt-8 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-full disabled:opacity-50"
            >
              {'<'}
            </button>

            <span className="text-zinc-500 dark:text-zinc-400">
               {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-full disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
