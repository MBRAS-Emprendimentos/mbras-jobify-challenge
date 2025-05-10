import { fetchAllJobs } from "./services/jobs";
import JobList from "../components/jobsList";

export default async function Home() {
  const jobs = await fetchAllJobs();

  return <JobList jobs={jobs} />;
}
