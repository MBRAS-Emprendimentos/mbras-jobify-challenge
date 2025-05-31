import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CiCalendarDate, CiLocationOn, CiMoneyBill } from "react-icons/ci";
import { FaClock } from "react-icons/fa";
import { Job } from "@/types/job";

type Props = {
  job: Job;
  onClick: (job: Job) => void;
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

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default function JobCard({ job, onClick }: Props) {
  const [maxSalaryLength, setMaxSalaryLength] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMaxSalaryLength(15); 
      } else {
        setMaxSalaryLength(30); 
      }
    };

    handleResize(); // define no carregamento
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onClick={() => onClick(job)}
      className="cursor-pointer flex flex-col gap-2 border-2 border-white rounded-md p-4 md:my-0 my-4 hover:bg-[#03092862]"
    >
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-stone-200 flex gap-2 text-center">{job.company_name}</p>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-5 py-5">
        <p className="text-stone-200 flex items-center gap-2">
          <CiLocationOn className="h-[19px] w-[19px]" />
          {job.candidate_required_location}
        </p>
        <p className="text-stone-200 flex items-center gap-2">
          <FaClock className="h-[19px] w-[19px]" />
          {job.job_type}
        </p>
        <p className="text-stone-200 flex items-center gap-2">
          <CiMoneyBill className="h-[19px] w-[19px]" />
          {job.salary === "" ? "not informed" : truncate(job.salary, maxSalaryLength)}
        </p>
        <p className="text-stone-200 flex items-center gap-2">
          <CiCalendarDate className="h-[19px] w-[19px]" />
          {formatDate(job.publication_date)}
        </p>
      </div>
      <div className="flex gap-2">
        <Badge className="bg-blue-light">{job.category}</Badge>
      </div>
    </div>
  );
}
