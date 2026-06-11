"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";

export const AnimatedDashboardHeader = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 rounded-2xl md:rounded-[30px] border border-purple-400/20 shadow-xl shadow-purple-200/50 mt-2 md:mt-10 p-4 sm:p-6 md:p-10 z-10 w-full"
    >
      {/* Background blobs */}
      <div className="absolute top-0 -left-10 w-32 md:w-40 h-32 md:h-40 bg-white/20 rounded-full mix-blend-overlay filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-10 w-32 md:w-40 h-32 md:h-40 bg-pink-400/20 rounded-full mix-blend-overlay filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="relative z-20 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 md:mb-10 drop-shadow-lg"
        >
          Welcome to <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">CreatiFlow</span>
        </motion.h1>

        <ul className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center w-full sm:gap-8 md:gap-16">
          {navLinks.slice(1, 5).map((link, idx) => (
            <motion.li
              key={link.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex justify-center"
            >
              <Link
                href={link.route}
                className="group flex flex-col items-center justify-center gap-2 md:gap-4"
              >
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:bg-purple-50 transition-all duration-300 relative overflow-hidden">
                  <Image src={link.icon} alt={link.label} width={28} height={28} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="font-medium text-sm sm:text-base text-white group-hover:text-purple-100 transition-colors text-center">{link.label}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};
