import JobCard from "@/components/job/JobCard";
import type { RemotiveJob } from "@/services/remotive";

interface Props {
  jobs: RemotiveJob[];
}

export default function JobList({ jobs }: Props) {
  if (!jobs.length) return <p>Nenhuma vaga encontrada</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} />
      ))}
    </div>
  );
}
