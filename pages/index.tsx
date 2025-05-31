/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
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
} from "@/components/ui/pagination";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import { DatePicker } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SearchInput from "@/components/SerachInput";
import CategoryFilter from "@/components/CategoryFilter";
import { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobDetailsRef = useRef<HTMLDivElement>(null);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log("Erro ao carregar vagas: ", err));
  }, []);

  useEffect(() => {
    if (selectedJob && jobDetailsRef.current) {
      jobDetailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedJob]);

  const filteredJobs = jobs.filter((job) => {
    const matchTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchCategory = job.category.toLowerCase().includes(searchCategory.toLowerCase());
    const matchDate = searchDate
      ? job.publication_date.slice(0, 10) === searchDate
      : true;

    return matchTitle && matchCategory && matchDate;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (showWelcome) {
    return (
      <main className="min-h-screen bg-blue-MBRAS text-white flex flex-col justify-center items-center gap-4 p-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to <span className="italic text-blue-light">Jobify</span>
        </h1>
        <p className="text-lg text-gray-200">What's your name?</p>

        {showAlert && (
          <Alert variant="destructive" className="w-64">
            <AlertTitle>Missing name</AlertTitle>
            <AlertDescription>Please enter your name to continue.</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              setShowAlert(false);
            }}
            className="w-64"
          />
          <Button
            className="bg-blue-light text-white"
            onClick={() => {
              if (nameInput.trim()) {
                setName(nameInput);
                setShowWelcome(false);
              } else {
                setShowAlert(true);
              }
            }}
          >
            Continue
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-MBRAS text-white p-8 overflow-x-hidden">
      <div className="md:hidden flex items-center gap-4 justify-end">
          <p className="text-base font-medium">Hello, <span className="font-semibold">{name}</span></p>
          <Avatar>
            <AvatarImage src="/img/avatar.png" className="h-12 w-12 rounded-full" />
          </Avatar>
      </div>
      <div className="flex justify-between items-center gap-5 p-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to <span className="italic">Jobify</span>
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            <span className="font-medium">Your journey to</span>{" "}
            <span className="font-bold italic text-blue-light">the perfect job</span> starts here.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <p className="text-base font-medium">Hello, <span className="font-semibold">{name}</span></p>
          <Avatar>
            <AvatarImage src="/img/avatar.png" className="h-12 w-12 rounded-full" />
          </Avatar>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center p-4">Vacancies</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 sm:gap-4 items-end">
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 items-center md:items-start justify-center md:justify-start m-auto md:m-0">
          <SearchInput value={searchTitle} onChange={setSearchTitle} />
          <CategoryFilter value={searchCategory} onChange={setSearchCategory} />
          <DatePicker value={searchDate} onChange={setSearchDate} />
          <button onClick={() => {
            setSearchTitle("");
            setSearchCategory("");
            setSearchDate("");
          }} className="bg-blue-light hover:bg-blue-700 rounded-md text-white p-1 w-43 md:w-64">Reset filter</button>
        </div>

        <p className="text-sm sm:text-base pt-5 md:pt-0">{filteredJobs.length} <span className="text-blue-light italic">Jobs</span> found</p>
      </div>

      <SkeletonCard className={jobs.length === 0 ? "" : "hidden"} />
      <div className="gap-6 flex mb-4">
        <div className={`w-full md:grid gap-4 ${selectedJob ? "grid-cols-1" : "grid-cols-2"}`}>
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={setSelectedJob} />
          ))}
        </div>

        {selectedJob && (
          <JobDetails
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
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
      i === 1 ||
      i === total ||
      i >= current - delta && i <= current + delta
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
}