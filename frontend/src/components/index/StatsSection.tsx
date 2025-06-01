"use client";
import React from "react";
import { motion } from "framer-motion";

const statsData = [
  { value: "10,000+", label: "Vagas Ativas" },
  { value: "5,000+", label: "Empresas Parceiras" },
  { value: "50,000+", label: "Profissionais Contratados" },
  { value: "95%", label: "Taxa de Satisfação" },
];

export function StatsSection() {
  return (
    <motion.section
      className="bg-white dark:bg-black py-10 px-6 transition-colors"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {statsData.map((item, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-bold dark:text-white">{item.value}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
