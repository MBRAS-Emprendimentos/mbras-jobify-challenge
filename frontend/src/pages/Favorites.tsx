import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favorites";
import { fetchJobById } from "../services/api";
import type { Favorite } from "../types/Favorite";
import type { Job } from "../types/Job";
import { Link } from "react-router-dom";
import SplitText from "../reactbits/textanimations/SplitText/SplitText";
import { motion } from "framer-motion";
import Magnet from "../reactbits/animations/Magnet/Magnet";
import HomeIcon from "../assets/home-icon.png";
import JobModal from "../components/JobModal";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const listItem = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.6,
    },
  }),
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (jobId: number) => {
    await removeFavorite(jobId);
    const updated = await getFavorites();
    setFavorites(updated);
  };

  const handleOpenModal = async (fav: Favorite) => {
    try {
      const fullJob = await fetchJobById(fav.jobId);
      setSelectedJob(fullJob);
    } catch (error) {
      console.error("Erro ao buscar vaga:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <main className="p-4 overflow-x-hidden w-full">
      <header className="flex items-center justify-between px-[2vw] mb-[14vh] mt-[4vh]">
        <h1>
          <SplitText
            text="Vagas favoritadas"
            className="text-[clamp(1rem,8vw,3.5rem)] font-[var(--font-calsans)] inline-block leading-[1.2] overflow-visible align-baseline"
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
        <Link to="/" aria-label="Voltar para página inicial">
          <img
            src={HomeIcon}
            alt="Ícone de Home"
            className="w-[clamp(2rem,4vw,4rem)] h-auto mr-[1.5vw] hover:opacity-80 transition duration-300"
          />
        </Link>
      </header>

      <section aria-live="polite">
        {favorites.length === 0 ? (
          <p className="text-[clamp(1rem,6vw,1.8rem)] font-[var(--font-dmsans)] overflow-visible my-[2vh] mx-[1.5vw]">Você ainda não favoritou nenhuma vaga.</p>
        ) : (
          <ul className="px-[1vw]">
            {favorites.map((fav, i) => (
              <motion.li
                key={fav.jobId}
                className="mb-4 border-b pb-2 flex justify-between items-center"
                variants={listItem}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenModal(fav)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenModal(fav);
                    }
                  }}
                  className="cursor-pointer"
                  aria-label={`Abrir detalhes da vaga ${fav.title} na empresa ${fav.company}`}
                >
                  <h2 className="w-[50vw] text-[clamp(1rem,6vw,1.8rem)] font-[var(--font-dmsans)] overflow-visible my-[2vh] mx-[1.5vw]">
                    {fav.title}
                  </h2>
                  <p className="text-[clamp(0.5rem,4vw,1.2rem)] font-[var(--font-dmsans)] overflow-visible mb-[2vh] mx-[1vw] text-gray-500">
                    {fav.company}
                  </p>
                </article>
                <Magnet padding={70} disabled={false} magnetStrength={5}>
                  <button
                    className="text-sm mr-[1.5vw] px-[3vw] py-[2vh] rounded-full cursor-pointer font-[var(--font-dmsans)] text-[clamp(0.1rem,4vw,0.9rem)] bg-red-200 text-red-900"
                    onClick={() => handleRemove(fav.jobId)}
                    aria-label={`Remover vaga ${fav.title} dos favoritos`}
                  >
                    Remover
                  </button>
                </Magnet>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      <JobModal job={selectedJob} onClose={handleCloseModal} />
    </main>
  );
};

export default Favorites;
