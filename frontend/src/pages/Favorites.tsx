import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favorites";
import type { Favorite } from "../types/Favorite";
import { Link } from "react-router-dom";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Vagas Favoritadas</h1>
      {favorites.length === 0 ? (
        <p>Você ainda não favoritou nenhuma vaga.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li
              key={fav.jobId}
              className="mb-4 border-b pb-2 flex justify-between items-center"
            >
              <div>
                <Link to={`/job/${fav.jobId}`}>
                  <span className="font-semibold text-blue-500 hover:underline">
                    {fav.title}
                  </span>
                </Link>
                <div className="text-sm text-gray-500">{fav.company}</div>
              </div>
              <button
                className="text-sm px-3 py-1 rounded bg-red-200"
                onClick={() => handleRemove(fav.jobId)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
