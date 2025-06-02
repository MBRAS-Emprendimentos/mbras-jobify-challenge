'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useJobs } from '@/context/JobsContext';
import type { Job } from '@/types/job';
import Loader from '@/components/Loader';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function VagaDetalhes() {
  const { jobs } = useJobs();
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const found = jobs.find((j) => j.id.toString() === id);
    setJob(found || null);
    setIsLoading(false);

    // Volta ao topo ao abrir a vaga
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, router.isReady, jobs]);

  function removeStyles(el: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(el, 'text/html');
    doc.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
    return doc.documentElement.innerHTML;
  }
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0f0f1a]">
        <Loader/>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0f0f1a]">
        <p className="text-center text-zinc-600 dark:text-zinc-400">Vaga não encontrada.</p>
      </main>
    );
  }

  return (
    <main className="bg-zinc-50 dark:bg-[#0f0f1a] text-zinc-900 dark:text-zinc-100 min-h-screen px-4 md:px-8 pb-16 pt-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#151624] border border-zinc-200 dark:border-[#272738] rounded-xl p-6 shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{job.title}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{job.company_name}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          {job.candidate_required_location}
        </p>

        {/* quando tiver link, nao quebrar o html */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-100 leading-relaxed overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: removeStyles(job.description) as string }}
        />

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          Candidatar-se →
        </a>
        <ScrollToTopButton />
      </div>
    </main>
  );
}
