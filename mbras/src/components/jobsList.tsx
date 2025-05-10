"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Job } from "@/app/types";

const JOBS_PER_PAGE = 10;

export default function JobList({ jobs }: { jobs: Job[] }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const start = (page - 1) * JOBS_PER_PAGE;
  const end = start + JOBS_PER_PAGE;
  const paginatedJobs = jobs.slice(start, end);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vagas Disponíveis (Página {page})</h1>

      <ul className="space-y-4">
        {paginatedJobs.map((job) => (
          <li key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company_name}</p>
            <p className="text-sm">{job.category}</p>
            <a
              href={job.url}
              target="_blank"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Ver detalhes
            </a>
          </li>
        ))}
      </ul>

      {/* Paginação */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {/* Botão de voltar */}
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Voltar
          </Link>
        )}

        {/* Página anterior */}
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {page - 1}
          </Link>
        )}

        {/* Página atual */}
        <span className="px-4 py-2 rounded bg-blue-600 text-white">{page}</span>

        {/* Próxima página */}
        {page < totalPages && (
          <Link
            href={`/?page=${page + 1}`}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {page + 1}
          </Link>
        )}

        {/* Botão de avançar */}
        {page < totalPages && (
          <Link
            href={`/?page=${page + 1}`}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Avançar
          </Link>
        )}
      </div>
    </main>
  );
}
