// pages/job/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import JobDetails from "@/components/Job/JobDetails";
import { Job } from "@/types/job";

export default function JobDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      fetch(`/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data))
        .catch((err) => console.error("Erro ao buscar vaga", err));
    }
  }, [id]);

  if (!job) return <p className="text-center mt-8">Carregando vaga...</p>;

  return (
    <main className="min-h-screen p-6 bg-blue-MBRAS text-white">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-white underline hover:text-blue-300"
      >
        ← Voltar
      </button>

      <JobDetails job={job} onClose={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </main>
  );
}
