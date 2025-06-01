"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/services/AuthService";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export function SideBar2() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white">
      <div className="mx-auto flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-indigo-700"
        >
          <Briefcase size={28} /> Jobify
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-indigo-700">
            Início
          </Link>
          <Link href="/#vagas" className="hover:text-indigo-700">
            Vagas
          </Link>
          <Link href="#" className="hover:text-indigo-700">
            Como Funciona
          </Link>
          <Link href="#" className="hover:text-indigo-700">
            Para Empresas
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="cursor-pointer px-4 py-2 rounded-md bg-indigo-700 text-white text-sm font-medium shadow hover:bg-indigo-800"
            >
              Entrar
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
