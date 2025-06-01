// src/components/JobCard.tsx

type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  candidate_required_location: string;
  publication_date: string;
  url: string;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-700">{job.company_name}</p>
      <p className="text-sm text-gray-500">{job.category} · {job.job_type}</p>
      <p className="text-sm text-gray-500">{job.candidate_required_location}</p>
      <a
        href={job.url}
        target="_blank"
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Ver vaga
      </a>
    </div>
  );
}