import React from 'react';
import { motion } from 'framer-motion';

const marqueeVariants = {
  animate: {
    x: [0, -2048], // Dibuat lebih panjang untuk teks yang banyak
    transition: {
      x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" },
    },
  },
};

export default function Ticker({ text, theme = 'light' }) {
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';
  const borderStyle = theme === 'light' ? 'border-b border-gray-200' : 'border-y border-gray-800';
  const textContent = `${text} / `.repeat(20); // Mengulang teks agar sangat panjang

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-40 overflow-x-hidden ${bgColor} ${textColor} ${borderStyle}`}
    >
      <motion.div
        className="flex flex-nowrap py-4"
        variants={marqueeVariants}
        animate="animate"
      >
        <span className="text-xl font-semibold uppercase px-8 flex-shrink-0">{textContent}</span>
        <span className="text-xl font-semibold uppercase px-8 flex-shrink-0">{textContent}</span>
      </motion.div>
    </motion.div>
  );
}