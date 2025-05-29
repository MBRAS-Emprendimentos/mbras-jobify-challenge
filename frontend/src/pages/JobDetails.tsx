import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../services/api';
import type { Job } from '../types/Job';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const getJob = async () => {
      if (id) {
        const data = await fetchJobById(Number(id));
        setJob(data);
      }
    };
    getJob();
  }, [id]);

  if (!job) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="mb-2">{job.company_name}</p>
      <p className="mb-2">{job.candidate_required_location}</p>
      <p className="mb-2">{job.salary}</p>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Aplicar para a vaga
      </a>
    </div>
  );
};

export default JobDetails;
