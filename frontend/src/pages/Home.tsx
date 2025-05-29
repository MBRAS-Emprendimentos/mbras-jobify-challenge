import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/api';
import type { Job } from '../types/Job';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(category);
      setJobs(data);
    };
    getJobs();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vagas de Emprego</h1>
      <select
        className="mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        <option value="software-dev">Desenvolvimento de Software</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
        {/* Adicione mais categorias conforme necessário */}
      </select>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="mb-2">
            <Link to={`/job/${job.id}`} className="text-blue-500 hover:underline">
              {job.title} - {job.company_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
