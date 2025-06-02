import type { Metadata } from "next";
import { FavoritesList } from "@/components/favorite/favoriteList";

export const metadata: Metadata = {
  title: `Jobify - Jobs Favorites`,
  description: `Suas vagas favoritadas, aproveita e se candidate-se e veja mais oportunidades no nosso painel!.`,
  robots: {
    follow: false,
    googleBot: {
      follow: false,
    },
  },
};

export default function FavoritesPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Minhas Vagas Favoritas</h1>
      <FavoritesList />
    </section>
  );
}
