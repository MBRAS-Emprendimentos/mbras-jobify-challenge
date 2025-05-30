"use client";
import React from "react";
import { motion } from "framer-motion";
import stepsData from "@/data/steps.json";

export function StepsSection() {
  return (
    <motion.section
      className="py-16 px-6 bg-gray-50 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl font-bold">Como funciona</h3>
      <p className="mt-2 text-gray-600">
        Três passos simples para encontrar sua próxima oportunidade
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {stepsData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg mb-4">
              {item.step}
            </div>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
