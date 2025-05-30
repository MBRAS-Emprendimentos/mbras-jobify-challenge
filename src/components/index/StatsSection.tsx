"use client";
import React from "react";
import { motion } from "framer-motion";
import statsData from "@/data/stats.json";

export function StatsSection() {
  return (
    <motion.section
      className="bg-white py-10 px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {statsData.map((item, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
