// src/components/MusicPlayer.jsx

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  // State untuk melacak status musik (berputar/tidak)
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Ref untuk mengakses elemen <audio> secara langsung
  const audioRef = useRef(null);

  // Fungsi untuk play/pause musik
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <>
      {/* Elemen audio ini tidak terlihat, hanya untuk logika */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Ini adalah tombol ikon yang terlihat di layar */}
      <motion.button
        onClick={togglePlayPause}
        className="fixed bottom-6 right-6 z-50 bg-white/20 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center text-white border border-white/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          // Ikon Speaker On (musik berputar)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          // Ikon Speaker Off (musik berhenti)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </motion.button>
    </>
  );
}