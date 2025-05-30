"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import testmonialData from "@/data/testmonial.json";

export function TestimonialsSection() {
  return (
    <motion.section
      className="py-16 px-6 bg-white text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        O que nossos usuários dizem
      </h3>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Histórias reais de profissionais que encontraram sucesso conosco.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testmonialData.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-6 bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
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
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.role} • {item.company}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">{item.text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
