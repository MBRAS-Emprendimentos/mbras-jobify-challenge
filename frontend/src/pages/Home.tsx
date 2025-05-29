import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";
import type { Job } from "../types/Job";
import { Link } from "react-router-dom";

interface Category {
  slug: string;
  name: string;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(category);
      setJobs(data);
    };
    getJobs();
  }, [category]);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://remotive.io/api/remote-jobs/categories");
      const data = await response.json();
      console.log("Categorias retornadas:", data); 
      setCategories(data.categories); 
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  fetchCategories();
}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vagas de Emprego</h1>

      <select
        className="mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <p>Quantidade de categorias: {categories.length}</p>

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
