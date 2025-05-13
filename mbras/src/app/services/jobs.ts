import { Job } from "../types";
const JOBS_API_URL = 'https://remotive.com/api/remote-jobs';


export async function fetchCategories() {
  const res = await fetch("https://remotive.com/api/remote-jobs/categories");
  const data = await res.json();

  return data.jobs.map((cat: { name: string; slug: string }) => ({
    name: cat.name,
    slug: cat.slug,
  }));
}


export async function fetchAllJobs(category: string): Promise<Job[]> {
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs', { cache: 'no-store' });
    const data = await response.json();
    return data.jobs;
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return [];
  }
}
