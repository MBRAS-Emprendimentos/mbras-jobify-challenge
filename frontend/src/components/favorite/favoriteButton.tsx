"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/services/AuthService";

interface FavoriteButtonProps {
  jobId: number;
  jobTitle: string;
  jobUrl: string;
  jobCompany?: string;
  jobLogo?: string;
}

export function FavoriteButton({
  jobId,
  jobTitle,
  jobUrl,
  jobCompany,
  jobLogo,
}: FavoriteButtonProps) {
  const { token } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);

  async function toggleFavorite() {
    if (!token) {
      alert("Você precisa estar logado para favoritar");
      return;
    }
    try {
      console.log({ jobId, jobTitle, jobUrl, jobCompany, jobLogo });
      if (isFavorited) {
        const res = await fetch(`http://localhost:8080/favorites/${jobId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          setIsFavorited(false);
          alert("Vaga removida dos favoritos com sucesso!");
        }
      } else {
        const res = await fetch("http://localhost:8080/favorites/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId,
            jobTitle,
            jobUrl,
            jobCompany,
            jobLogo,
          }),
        });
        console.log(await res.json());
        if (res.ok) {
          setIsFavorited(true);
          alert("Vaga salva nos favoritos com sucesso!");
        }
      }
    } catch (err) {
      console.error("Erro ao favoritar/desfavoritar:", err);
    }
  }

  useEffect(() => {
    async function checkFavorite() {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8080/favorites/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Falha ao buscar favoritos");
        const favorites = await res.json();

        const found = favorites.some(
          (fav: { job_id: number }) => fav.job_id === jobId
        );
        setIsFavorited(found);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      }
    }
    checkFavorite();
  }, [jobId, token]);

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-6 mb-16 inline-block rounded-xl px-6 py-3 font-medium text-white shadow ${
        isFavorited
          ? "bg-red-600 hover:bg-red-700"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {isFavorited ? "Desfavoritar" : "Favoritar"}
    </button>
  );
}
