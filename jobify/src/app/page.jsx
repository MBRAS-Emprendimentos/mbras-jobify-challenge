import { cookies } from 'next/headers';
import JobList from "@/components/JobList/JobList";

export default async function Home() {
  const jobsList = await fetch('https://remotive.com/api/remote-jobs?limit=10').then(res => res.json());
  const categoryList = await fetch('https://remotive.com/api/remote-jobs/categories').then(res => res.json());

  return (
    <main className="flex flex-col mx-6 h-screen">
      <div className="flex w-full justify-center">
        <JobList jobs={jobsList.jobs} categories={categoryList.jobs}/>
      </div>
    </main>
  );
}
