"use client";
import Link from "next/link";
import Image from "next/image";
import type { RemotiveJob } from "@/services/remotive";

export default function JobCard({ job }: { job: RemotiveJob }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="cursor-pointer w-full max-w-3xl rounded-2xl border bg-white p-4 shadow-md transition hover:shadow-lg"
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
          <h2 className="text-lg font-semibold leading-tight">{job.title}</h2>
          <p className="text-sm text-slate-600">{job.company_name}</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {job.category}
        </span>
      </div>
    </Link>
  );
}
