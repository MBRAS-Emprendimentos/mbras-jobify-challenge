import { useEffect, useState, useRef } from "react";
import { fetchJobs } from "../services/api";
import type { Job } from "../types/Job";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favorites";
import { fetchJobById } from "../services/api";
import { Link } from "react-router-dom";
import type { Favorite } from "../types/Favorite";
import SplitText from "../reactbits/textanimations/SplitText/SplitText";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Magnet from "../reactbits/animations/Magnet/Magnet";
import Search from "../assets/search-icon.png";
import Heart from "../assets/heart-icon.png";

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
      <div>
        -
        <button
          onClick={onClick}
          className="w-[70vw] text-left text-[clamp(1rem,6vw,2rem)] font-[var(--font-dmsans)] overflow-visible my-[1vh] mx-[1.5vw] hover:underline"
        >
          {job.title}
        </button>
        <div className="text-[clamp(0.5rem,4vw,1.2rem)] font-[var(--font-dmsans)] overflow-visible mb-[2vh] mx-[1vw] text-gray-500">
          {job.company_name}
        </div>
      </div>
      <Magnet padding={70} disabled={false} magnetStrength={5}>
        <button
          className={`text-sm mr-[1.5vw] px-[3vw] py-[2.5vh] rounded-full cursor-pointer font-[var(--font-dmsans)] text-[clamp(0.1rem,4vw,0.9rem)] ${
            isFavorite ? "bg-red-200 text-red-900" : "bg-blue-200 text-blue-900"
          }`}
          onClick={() => toggleFavorite(job)}
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
    <div className="p-4 overflow-x-hidden">
      <h1 className="min-h-[22vh] overflow-visible">
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

      {/* Botão com contagem de favoritos */}
      <section className="px-[2.5vw] flex items-center">
        <section className="flex items-center w-full mb-4">
          <img
            src={Search}
            className="mt-[-2vh] mr-[0.5vw]"
            alt="Ícone de campo de busca"
          />
          <input
            className="mb-4 p-[1vh] border rounded-full w-[80vw] text-[clamp(1rem,4vw,0.2rem)] pl-[1.5vw]"
            placeholder="Buscar vaga ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        <Link to="/favorites" className="relative inline-block mt-[-5vh] mr-[1.5vw]">
          <img
            src={Heart}
            alt="Favoritos"
            className="hover:opacity-80 transition duration-200"
          />
          {favorites.length > 0 && (
            <span className="absolute -top-5 -right-5 bg-red-500 text-white text-[clamp(0.5rem,4vw,1.2rem)] w-9 h-8 flex items-center justify-center rounded-full">
              {favorites.length}
            </span>
          )}
        </Link>
      </section>

      <div className="mb-[10vh] flex flex-wrap gap-2 ml-[2.5vw]">
  {[
    { value: "", label: "Todas" },
    { value: "software-dev", label: "Dev" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ].map(({ value, label }) => (
    <button
      key={value}
      className={`px-[2vw] py-[2vh] rounded-full border transition cursor-pointer ${
        category === value
          ? "bg-blue-500 text-white text-[clamp(0.1rem,4vw, 0.6rem)]"
          : "bg-white text-gray-700 hover:bg-blue-100 text-[clamp(0.4rem,4vw,1rem)]"
      }`}
      onClick={() => setCategory(value)}
    >
      {label}
    </button>
  ))}
</div>


      <motion.ul layout>
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
          className="cursor-pointer my-[6vh] ml-[2.5vw] px-[3vw] py-[2.5vh] text-white bg-blue-500 hover:bg-blue-400 text-[clamp(0.1rem,4vw,1rem)] rounded-full"
          onClick={() => setVisibleCount((prev) => prev + 18)}
        >
          Ver mais vagas
        </button>
      )}
   {/* Modal */}
   <AnimatePresence>
  {selectedJob && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="bg-white max-h-[90vh] overflow-y-auto rounded-xl p-6 w-full max-w-3xl shadow-lg relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.button
          className="absolute top-4 right-4 text-black text-xl"
          onClick={() => setSelectedJob(null)}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          ✕
        </motion.button>

        <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
        <p className="text-lg text-gray-700 mb-1">{selectedJob.company_name}</p>
        <p className="mb-1">{selectedJob.candidate_required_location}</p>
        <p className="mb-2 text-blue-600 font-semibold">{selectedJob.salary}</p>
        <div
          className="prose prose-sm max-w-full"
          dangerouslySetInnerHTML={{ __html: selectedJob.description }}
        />
        <a
          href={selectedJob.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          Aplicar para a vaga
        </a>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};


export default Home;

