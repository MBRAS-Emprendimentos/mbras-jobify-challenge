"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonialData = [
  {
    name: "Ana Silva",
    role: "Desenvolvedora Frontend",
    company: "TechCorp",
    text: "Encontrei minha vaga...",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Carlos Santos",
    role: "Designer UX/UI",
    company: "DesignStudio",
    text: "Interface intuitiva...",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Maria Oliveira",
    role: "Gerente de Marketing",
    company: "MarketingPro",
    text: "Processo simples...",
    img: "https://images.unsplash.com/photo-1602442787305-decbd65be507?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function TestimonialsSection() {
  return (
    <motion.section
      className="py-16 px-6 bg-white dark:bg-black text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
        O que nossos usuários dizem
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
        Histórias reais de profissionais que encontraram sucesso conosco.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonialData.map((item, idx) => (
          <div
            key={idx}
            className="border dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <Image
                src={item.img}
                alt={item.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.role} • {item.company}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
