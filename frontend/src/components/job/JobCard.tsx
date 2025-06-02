"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { RemotiveJob } from "@/services/remotive";

export default function JobCard({ job }: { job: RemotiveJob }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/jobs/${job.id}`);
    }, 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm">
          <div className="text-indigo-600 dark:text-indigo-400 text-xl font-semibold animate-pulse">
            Carregando...
          </div>
        </div>
      )}
      <div
        onClick={handleClick}
        className="cursor-pointer w-full max-w-3xl rounded-2xl border bg-white dark:bg-gray-900 p-4 shadow-md transition hover:shadow-lg"
      >
        <div className="flex items-center gap-4">
          {job.company_logo && (
            <Image
              src={job.company_logo}
              alt={`${job.company_name} logo`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-contain"
            />
          )}
          <div className="flex-1">
            <h2 className="text-lg font-semibold leading-tight dark:text-white">
              {job.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {job.company_name}
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 dark:bg-indigo-900 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {job.category}
          </span>
        </div>
      </div>
    </>
  );
}
