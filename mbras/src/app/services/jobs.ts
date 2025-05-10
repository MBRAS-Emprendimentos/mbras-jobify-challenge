import { Job } from "../types";
const JOBS_API_URL = 'https://remotive.com/api/remote-jobs';


// // export async function FilterByCat(category) {
//     try{
//         const urlEnd = `${JOBS_API_URL}?category=${category}`;
//         const response = await fetch(urlEnd);
//         const data = await response.json();
        
//         console.log(data);
//         return data;

//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// // }

// src/app/services/jobs.ts

export async function fetchAllJobs(): Promise<Job[]> {
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs', { cache: 'no-store' });
    const data = await response.json();
    return data.jobs;
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return [];
  }
}
