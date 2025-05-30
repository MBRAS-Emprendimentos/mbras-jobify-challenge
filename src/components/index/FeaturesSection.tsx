"use client";
import React from "react";
import { motion } from "framer-motion";
import featureData from "@/data/feature.json";

export function FeaturesSection() {
  return (
    <motion.section
      className="py-16 px-6 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {featureData.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-6 bg-gray-50 hover:shadow-md transition"
          >
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
