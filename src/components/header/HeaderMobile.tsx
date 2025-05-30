import React, { useRef } from "react";
import Link from "next/link";
import { Mode } from "@/utils/buttonNav";
import { Briefcase } from "lucide-react";
const SideBar: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const openNav = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "250px";
    }
  };

  const closeNav = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "0";
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-20 bg-white shadow-sm">
        <div className="mx-auto flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl">
          <Mode openNav={openNav} />
          <div
            ref={sidebarRef}
            className="fixed top-0 left-0 h-full bg-black overflow-x-hidden transition-all duration-500 z-50 pt-16"
            style={{ width: "0px" }}
          >
            <button
              onClick={closeNav}
              className="absolute top-0 right-6 text-white text-4xl font-bold"
            >
              &times;
            </button>
            <Link
              href="/"
              className="block text-white text-lg px-8 py-3 hover:text-gray-300"
              onClick={closeNav}
            >
              Início
            </Link>
            <Link
              href="#"
              className="block text-white text-lg px-8 py-3 hover:text-gray-300"
              onClick={closeNav}
            >
              Vagas
            </Link>
            <Link
              href="#"
              className="block text-white text-lg px-8 py-3 hover:text-gray-300"
              onClick={closeNav}
            >
              Como funciona
            </Link>
            <Link
              href="#"
              className="block text-white text-lg px-8 py-3 hover:text-gray-300"
              onClick={closeNav}
            >
              Para Empresas
            </Link>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-semibold text-indigo-700"
          >
            <Briefcase size={28} /> Jobify
          </a>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100"></button>
            <button className="px-4 py-2 rounded-md bg-indigo-700 text-white text-sm font-medium shadow hover:bg-indigo-800">
              Entrar
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default SideBar;
