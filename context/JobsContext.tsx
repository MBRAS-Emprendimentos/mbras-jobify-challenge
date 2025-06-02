'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '@/types/job';

type JobsContextType = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs deve ser usado dentro de um JobsProvider');
  }
  return context;
}
