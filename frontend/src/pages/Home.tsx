import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";
import type { Job } from "../types/Job";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favorites";
import { Link } from "react-router-dom";
import type { Favorite } from "../types/Favorite";

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(category);
      setJobs(data);
    };
    getJobs();
  }, [category]);

  useEffect(() => {
    getFavorites().then((data: Favorite[]) => {
      setFavorites(data.map((f) => f.jobId));
    });
  }, []);

  const toggleFavorite = async (job: Job) => {
    if (favorites.includes(job.id)) {
      await removeFavorite(job.id);
    } else {
      await addFavorite({
        jobId: job.id,
        title: job.title,
        company: job.company_name,
      });
    }
    const data: Favorite[] = await getFavorites();
    setFavorites(data.map((f) => f.jobId));
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vagas Remotas</h1>
      <Link
        to="/favorites"
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Ver Favoritos
      </Link>
      <input
        className="mb-4 p-2 border rounded w-full"
        placeholder="Buscar vaga ou empresa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        <option value="software-dev">Desenvolvimento de Software</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
      </select>

      <ul>
        {filteredJobs.map((job) => (
          <li
            key={job.id}
            className="mb-4 border-b pb-2 flex justify-between items-center"
          >
            <div>
              <Link
                to={`/job/${job.id}`}
                className="text-blue-600 hover:underline"
              >
                {job.title}
              </Link>
              <div className="text-sm text-gray-500">{job.company_name}</div>
            </div>
            <button
              className={`text-sm px-3 py-1 rounded ${
                favorites.includes(job.id) ? "bg-red-200" : "bg-green-200"
              }`}
              onClick={() => toggleFavorite(job)}
            >
              {favorites.includes(job.id) ? "Remover" : "Favoritar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
