"use client";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#0D1117] text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg">Jobify</h3>
          <p className="mt-2 text-sm">
            Conectando talentos com <br />
            oportunidades excepcionais.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Para Candidatos</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Buscar Vagas
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Criar Perfil
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Dicas de Carreira
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Para Empresas</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Publicar Vaga
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Buscar Talentos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Planos
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Suporte</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Central de Ajuda
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © 2025 Jobify. Todos os direitos reservados.
      </div>
    </footer>
  );
}
