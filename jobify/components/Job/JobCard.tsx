import { Badge } from "@/components/ui/badge"

// components/Job/JobCard.tsx
type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  
};

type Props = {
  job: Job;
  onClick: (job: Job) => void;
};

export default function JobCard({ job, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(job)}
      className="cursor-pointer flex flex-col gap-2 border-2 border-white rounded-md p-4 hover:bg-zinc-800"
    >
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-stone-200">{job.company_name}</p>
      <p className="text-stone-200">
        {job.candidate_required_location} - {job.job_type}
      </p>
      <div className="flex gap-2">
        <Badge className="bg-blue-light">{job.category}</Badge>
      </div>
    </div>
  );
}