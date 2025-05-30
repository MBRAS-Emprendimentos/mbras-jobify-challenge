"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function MainSection() {
  return (
    <motion.section
      className="text-center px-6 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <p className="text-sm text-gray-500">Mais de 10.000 vagas disponíveis</p>
      <h2 className="text-4xl md:text-5xl font-bold mt-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          próxima oportunidade
        </span>
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Conectamos talentos excepcionais com as melhores empresas do Brasil.
        Descubra vagas que combinam com seu perfil e acelere sua carreira.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md h-9 px-4 py-2 transition-colors hover:opacity-90"
        >
          Explorar Vagas
        </Link>
        <Button variant="outline">Para Empresas</Button>
      </div>
    </motion.section>
  );
}
