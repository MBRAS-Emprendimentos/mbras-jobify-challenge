import Image from "next/image";
import { fetchJobById } from "@/services/remotive";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const jobId = Number(id);
  const job = await fetchJobById(jobId);

  if (!job) {
    return {
      title: "Jobify - Vaga não encontrada",
      description: "Vaga não encontrada na Jobify.",
    };
  }

  return {
    title: `Jobify - ${job.title}`,
    description: `Oportunidade na empresa ${job.company_name}. Local: ${job.candidate_required_location}.`,
  };
}

export default async function JobDetail({ params }: Props) {
  const { id } = await params;
  const jobId = Number(id);
  const job = await fetchJobById(jobId);

  if (!job) notFound();

  return (
    <article className="mx-auto max-w-none lg:prose-lg px-4 py-8">
      <Link href="/" className="no-underline">
        ← Voltar
      </Link>
      {job.company_logo && (
        <Image
          src={job.company_logo}
          alt={`${job.company_name} logo`}
          width={96}
          height={96}
          className="mb-4 rounded-full object-contain"
          priority
        />
      )}
      <h2>{job.title}</h2>
      <p>
        <strong>{job.company_name}</strong> – {job.candidate_required_location}
      </p>
      {job.salary && <p>Salary {job.salary}</p>}
      <div dangerouslySetInnerHTML={{ __html: job.description }} />

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 mb-16 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow hover:bg-indigo-700"
      >
        Aplicar no site da vaga ↗
      </a>
    </article>
  );
}
