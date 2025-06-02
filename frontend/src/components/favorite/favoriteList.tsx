"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/services/AuthService";

interface Favorite {
  id: number;
  job_id: number;
  job_title: string;
  job_url: string;
  job_company?: string | null;
  job_logo?: string | null;
  created_at: string;
}

export function FavoritesList() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    async function fetchFavorites() {
      try {
        const res = await fetch("http://localhost:8080/favorites/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Falha ao buscar favoritos");
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
        setFavorites([]);
      }
      setLoading(false);
    }

    fetchFavorites();
  }, [token]);

  if (loading) return <p>Carregando favoritos...</p>;

  if (favorites.length === 0) return <p>Nenhuma vaga favoritada ainda.</p>;

  return (
    <ul className="space-y-4">
      {favorites.map((fav) => (
        <li key={fav.id} className="border rounded-xl p-4 shadow">
          <a
            href={fav.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold"
          >
            {fav.job_title}
          </a>
          <p>{fav.job_company ?? "Empresa não informada"}</p>
          <p className="text-sm text-gray-500">
            {new Date(fav.created_at).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
