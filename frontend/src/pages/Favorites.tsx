import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favorites";
import type { Favorite } from "../types/Favorite";
import { Link } from "react-router-dom";
import SplitText from "../reactbits/textanimations/SplitText/SplitText";
import { motion } from "framer-motion";
import Magnet from "../reactbits/animations/Magnet/Magnet";
import HomeIcon from "../assets/home-icon.png";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

// Animação por item com custom delay
const listItem = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4, // quanto maior, mais espaçado o delay
      duration: 0.6,
    },
  }),
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

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

  return (
    <div className="p-4 overflow-x-hidden w-full">
      <div className="flex items-center justify-between px-[2vw] mb-[14vh] mt-[4vh]">
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
        <Link to="/">
          <img
            src={HomeIcon}
            alt="Ícone de Home"
            className="w-[clamp(2rem,4vw,4rem)] h-auto mr-[1.5vw] hover:opacity-80 transition duration-300"
          />
        </Link>
      </div>

      {favorites.length === 0 ? (
        <p>Você ainda não favoritou nenhuma vaga.</p>
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
              <div>
                <Link to={`/job/${fav.jobId}`}>
                  <span className="w-[50vw] text-[clamp(1rem,6vw,1.8rem)] font-[var(--font-dmsans)] overflow-visible my-[2vh] mx-[1.5vw]">
                    {fav.title}
                  </span>
                </Link>
                <div className="text-[clamp(0.5rem,4vw,1.2rem)] font-[var(--font-dmsans)] overflow-visible mb-[2vh] mx-[1vw] text-gray-500">
                  {fav.company}
                </div>
              </div>
              <Magnet padding={70} disabled={false} magnetStrength={5}>
                <button
                  className="text-sm mr-[1.5vw] px-[3vw] py-[2vh] rounded-full cursor-pointer font-[var(--font-dmsans)] text-[clamp(0.1rem,4vw,0.9rem)] bg-red-200 text-red-900"
                  onClick={() => handleRemove(fav.jobId)}
                >
                  Remover
                </button>
              </Magnet>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
