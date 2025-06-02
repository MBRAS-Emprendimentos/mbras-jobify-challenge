"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CallToAction() {
  return (
    <motion.section
      className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-4">
        Pronto para dar o próximo passo?
      </h3>
      <p className="mb-6">
        Junte-se a milhares de profissionais que já encontraram suas
        oportunidades ideais
      </p>
      <Link
        href="/#vagas"
        className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
      >
        Começar Agora →
      </Link>
    </motion.section>
  );
}
