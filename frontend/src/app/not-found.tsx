import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobify - Erro",
  description: "Página não encontrada, volte para o início",
  openGraph: {
    title: "Jobify - Erro 404",
    description: "Página não encontrada, volte para o início",
  },
  robots: {
    follow: false,
    googleBot: {
      follow: false,
    },
  },
};

export default function notFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4 p-4">
        <h1 className="text-4xl font-bold text-red-600">
          Página 404 não encontrada
        </h1>
        <p className="text-lg">
          A página que tentou acessar não está disponível
        </p>
        <Link href="/" className="text-blue-500 underline hover:text-blue-700">
          Voltar para início
        </Link>
      </div>
    </>
  );
}
