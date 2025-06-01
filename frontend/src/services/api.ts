import axios from 'axios';
import type { Job } from '../types/Job';

const API_URL = 'https://remotive.com/api/remote-jobs';

export const fetchJobs = async (category?: string): Promise<Job[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: category ? { category } : {},
    });
    return response.data.jobs;
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    return [];
  }
};

export const fetchJobById = async (id: number): Promise<Job | null> => {
  try {
    const response = await axios.get(API_URL);
    const job = response.data.jobs.find((job: Job) => job.id === id);
    return job || null;
  } catch (error) {
    console.error('Erro ao buscar vaga:', error);
    return null;
  }
};
