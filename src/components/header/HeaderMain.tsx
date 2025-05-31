import { Briefcase } from "lucide-react";
import Link from "next/link";

export function SideBar2() {
  return (
    <header className="w-full sticky top-0 z-20 bg-white shadow-sm">
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
          <button className="p-2 rounded-full hover:bg-slate-100"></button>
          <button className="cursor-pointer px-4 py-2 rounded-md bg-indigo-700 text-white text-sm font-medium shadow hover:bg-indigo-800">
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
