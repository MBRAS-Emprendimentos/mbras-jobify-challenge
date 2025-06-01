"use client";
import React from "react";
import { motion } from "framer-motion";

const featureData = [
  {
    title: "Busca Inteligente",
    description: "Encontre vagas que combinam...",
  },
  {
    title: "Empresas Verificadas",
    description: "Todas as empresas são verificadas...",
  },
  {
    title: "Vagas Exclusivas",
    description: "Acesso a oportunidades exclusivas...",
  },
  {
    title: "Crescimento Profissional",
    description: "Encontre posições que impulsionem...",
  },
];

export function FeaturesSection() {
  return (
    <motion.section
      className="py-16 px-6 bg-white dark:bg-black transition-colors"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {featureData.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition"
          >
            <h4 className="font-semibold text-lg dark:text-white">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
