import { CgCloseO } from "react-icons/cg";
import { Job } from "@/types/job";

type Props = {
  job: Job;
  onClose: () => void;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export default function JobDetails({ job, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-700">
        
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-red-400 hover:text-red-500 transition"
        >
          <CgCloseO className="w-6 h-6" />
        </button>

        {/* Conteúdo com scroll */}
        <div className="p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
          <h2 className="text-3xl font-extrabold text-white mb-4">{job.title}</h2>

          <ul className="text-sm space-y-1 mb-4 text-zinc-300">
            <li><span className="font-semibold text-white">Empresa:</span> {job.company_name}</li>
            <li><span className="font-semibold text-white">Local:</span> {job.candidate_required_location}</li>
            <li><span className="font-semibold text-white">Tipo:</span> {job.job_type}</li>
            <li><span className="font-semibold text-white">Salário:</span> {job.salary || "Não informado"}</li>
            <li><span className="font-semibold text-white">Publication date:</span> {formatDate(job.publication_date)}</li>
          </ul>

          <div className="text-sm text-zinc-300 space-y-3">
            <p className="text-white font-semibold">Descrição:</p>
            <div
              className="prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
