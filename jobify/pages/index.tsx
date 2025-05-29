import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import JobCard from "@/components/Job/JobCard";
import JobDetails from "@/components/Job/JobDetails";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { SkeletonCard } from "@/components/ui/SkeletonCard"
import { DatePicker } from "@/components/ui/datePicker";


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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [serachDate, setSearchDate] = useState("");

  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log("Erro ao carregar vagas: ", err));
  }, []);

  return (
    <main className="min-h-screen bg-blue-MBRAS text-white p-8 overflow-x-hidden">

      <div className="flex justify-end gap-5">
        <p>Olá, {name}</p>
        <Avatar>
          <AvatarImage src="/img/avatar.png" className="h-10 w-10 rounded-full mr-3" />
        </Avatar>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center p-4">Vagas</h1>
      <div className="flex mb-4 gap-1.5">
        <Input className="w-50" type="text" placeholder="Pesquisar vagas" />
        <DatePicker />
      </div>
      <SkeletonCard className={jobs.length === 0 ? "" : "hidden"} />
      <div className="gap-6 flex mb-4">
        <div className={`w-full grid gap-4 ${selectedJob ? "grid-cols-1" : "grid-cols-2"}`}>
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={setSelectedJob} />
          ))}
        </div>

        {selectedJob && <JobDetails job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </div>
      {totalPages > 1 && (
        <Pagination className="overflow-x-hidden items-center justify-center">
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={goToPreviousPage}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {getPaginationRange(currentPage, totalPages).map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <span className="px-2 text-muted-foreground">...</span>
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(Number(page))}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      )}

    </main>
  );
}



function getPaginationRange(current: number, total: number): (number | string)[] {
  const delta = 2;
  const range: (number | string)[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || // Sempre mostra a primeira
      i === total || // Sempre mostra a última
      i >= current - delta && i <= current + delta // Mostra ao redor da atual
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
}
