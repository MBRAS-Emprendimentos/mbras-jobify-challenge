import { useEffect, useState, useRef } from "react";
import { fetchJobs, fetchJobById } from "../services/api";
import type { Job } from "../types/Job";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favorites";
import { Link } from "react-router-dom";
import type { Favorite } from "../types/Favorite";
import SplitText from "../reactbits/textanimations/SplitText/SplitText";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Magnet from "../reactbits/animations/Magnet/Magnet";
import Search from "../assets/search-icon.png";
import Heart from "../assets/heart-icon.png";
import JobModal from "../components/JobModal";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const JobItem = ({
  job,
  isFavorite,
  toggleFavorite,
  index,
  onClick,
}: {
  job: Job;
  isFavorite: boolean;
  toggleFavorite: (job: Job) => void;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      className="mx-[1vw] my-[4vh] border-b pb-2 flex justify-between items-center"
    >
      <article>
        <button
          onClick={onClick}
          type="button"
          className="cursor-pointer w-[70vw] text-left text-[clamp(1rem,6vw,2rem)] font-[var(--font-dmsans)] overflow-visible my-[1vh] mx-[1.5vw]"
          aria-label={`Abrir detalhes da vaga: ${job.title}`}
        >
          {job.title}
        </button>
        <p className="text-[clamp(0.5rem,4vw,1.2rem)] font-[var(--font-dmsans)] overflow-visible mb-[2vh] mx-[1vw] text-gray-500">
          {job.company_name}
        </p>
      </article>
      <Magnet padding={70} disabled={false} magnetStrength={5}>
        <button
          type="button"
          className={`text-sm mr-[1.5vw] px-[3vw] py-[2.5vh] rounded-full cursor-pointer font-[var(--font-dmsans)] text-[clamp(0.1rem,4vw,0.9rem)] ${
            isFavorite ? "bg-red-200 text-red-900" : "bg-blue-200 text-blue-900"
          }`}
          onClick={() => toggleFavorite(job)}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </Magnet>
    </motion.li>
  );
};

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(category);
      setJobs(data);
      setVisibleCount(18);
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
    <main className="p-4 overflow-x-hidden">
      <header className="min-h-[22vh] overflow-visible">
        <h1>
          <SplitText
            text="Vagas remotas"
            className="text-[clamp(3rem,8vw,4rem)] font-[var(--font-calsans)] text-center inline-block leading-[1.2] overflow-visible align-baseline mt-[4vh] mx-[2vw]"
            delay={100}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </h1>
      </header>

      <section
        className="px-[2.5vw] flex items-center"
        aria-label="Barra de busca e acesso aos favoritos"
      >
        <form
          className="flex items-center w-full mb-4"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <img
            src={Search}
            alt="Ícone de busca"
            className="mt-[-2vh] mr-[0.5vw]"
          />
          <label htmlFor="search" className="sr-only">Buscar vaga ou empresa</label>
          <input
            id="search"
            className="mb-4 p-[1vh] border rounded-full w-[80vw] text-[clamp(1rem,4vw,0.2rem)] pl-[1.5vw]"
            placeholder="Buscar vaga ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <nav>
          <Link
            to="/favorites"
            className="relative inline-block mt-[-5vh] mr-[1.5vw]"
            aria-label="Ir para favoritos"
          >
            <img
              src={Heart}
              alt="Ícone de favoritos"
              className="hover:opacity-80 transition duration-200"
            />
            {favorites.length > 0 && (
              <span
                className="absolute -top-5 -right-5 bg-red-500 text-white text-[clamp(0.5rem,4vw,1.2rem)] w-9 h-8 flex items-center justify-center rounded-full"
                aria-label={`${favorites.length} vagas favoritas`}
              >
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </section>

      <section className="mb-[10vh] flex flex-wrap gap-2 ml-[2.5vw]" aria-label="Filtros por categoria">
        {[{ value: "", label: "Todas" }, { value: "software-dev", label: "Dev" }, { value: "design", label: "Design" }, { value: "marketing", label: "Marketing" }].map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`px-[2vw] py-[2vh] rounded-full border transition cursor-pointer ${
              category === value
                ? "bg-blue-500 text-white text-[clamp(0.1rem,4vw, 0.6rem)]"
                : "bg-white text-gray-700 hover:bg-blue-100 text-[clamp(0.4rem,4vw,1rem)]"
            }`}
            onClick={() => setCategory(value)}
            aria-pressed={category === value}
          >
            {label}
          </button>
        ))}
      </section>

      <motion.ul layout aria-label="Lista de vagas">
        <AnimatePresence>
          {filteredJobs.slice(0, visibleCount).map((job, index) => (
            <JobItem
              key={job.id}
              job={job}
              isFavorite={favorites.includes(job.id)}
              toggleFavorite={toggleFavorite}
              index={index}
              onClick={async () => {
                const detailed = await fetchJobById(job.id);
                setSelectedJob(detailed);
              }}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      {visibleCount < filteredJobs.length && (
        <button
          type="button"
          className="cursor-pointer my-[6vh] ml-[2.5vw] px-[3vw] py-[2.5vh] text-white bg-blue-500 hover:bg-blue-400 text-[clamp(0.1rem,4vw,1rem)] rounded-full"
          onClick={() => setVisibleCount((prev) => prev + 18)}
        >
          Ver mais vagas
        </button>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  );
};

export default Home;
