import { Job } from "../app/types";
import Link from "next/link";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <li
          key={job.id}
          className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-300 dark:border-gray-600"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <a
              href={job.url}
              target="_blank"
              className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {job.title}
            </a>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{job.company_name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{job.category}</p>
        </li>
      ))}
    </ul>
  );
}
