// components/Job/JobDetails.tsx
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
  onClose: () => void;
};

export default function JobDetails({ job, onClose }: Props) {
  return (
    <div className="w-full border p-6 rounded bg-zinc-800 h-fit">
      <div className="flex justify-end">
        <button onClick={onClose} className="mt-4 text-red-400 cursor-pointer">
          X
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p><strong>Empresa:</strong> {job.company_name}</p>
      <p><strong>Local:</strong> {job.candidate_required_location}</p>
      <p><strong>Tipo:</strong> {job.job_type}</p>
      <p><strong>Salário:</strong> {job.salary === "" ? "Não informado" : job.salary}</p>
      <p className="mt-4"><strong>Descrição:</strong></p>
      <p className="text-stone-300 text-sm">{job.description}</p>
    </div>
  );
}
