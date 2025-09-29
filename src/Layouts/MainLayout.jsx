import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import Navbar from "../components/Navbar";
import Ticker from '../components/Ticker';
import MusicPlayer from '../components/MusicPlayer';

export default function MainLayout() {
  const [activeHeader, setActiveHeader] = useState('main');
  
  // Ref untuk menyimpan posisi section, agar tidak perlu query DOM terus-menerus
  const sectionPositions = useRef({ justDropped: 0, bestPick: 0 });

  useEffect(() => {
    // Fungsi ini akan mencoba mencari section dan menyimpan posisinya
    const cacheSectionPositions = () => {
      const justDroppedEl = document.getElementById('just-dropped-section');
      const bestPickEl = document.getElementById('bestpick-section');
      if (justDroppedEl && bestPickEl) {
        sectionPositions.current = {
          justDropped: justDroppedEl.offsetTop,
          bestPick: bestPickEl.offsetTop,
        };
        return true; // Berhasil
      }
      return false; // Gagal, elemen belum ada
    };

    const handleScroll = () => {
      const { justDropped, bestPick } = sectionPositions.current;
      
      // Jika posisi belum tersimpan, jangan jalankan logika scroll
      if (justDropped === 0 || bestPick === 0) return;
      
      const scrollY = window.scrollY;
      const navbarHeight = 85; // Perkiraan tinggi navbar

      if (scrollY >= bestPick - navbarHeight) {
        setActiveHeader('outfit');
      } else if (scrollY >= justDropped - navbarHeight) {
        setActiveHeader('new');
      } else {
        setActiveHeader('main');
      }
    };

    // Coba cari posisi section setelah render awal
    const initialCheck = requestAnimationFrame(cacheSectionPositions);
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(initialCheck);
    };
  }, []); // Hanya berjalan sekali

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      
      <AnimatePresence mode="wait">
        {activeHeader === 'main' && <Navbar key="mainNavbar" />}
        {activeHeader === 'new' && <Ticker key="newTicker" text="NEW" theme="dark" />}
        {activeHeader === 'outfit' && <Ticker key="outfitTicker" text="OUTFIT" theme="light" />}
      </AnimatePresence>
      
      <MusicPlayer />
      
      <main>
        <Outlet />
      </main>

      <footer className="bg-black text-center p-6 border-t border-gray-800">
        <p className="text-gray-500 uppercase text-xs tracking-widest">© 2025 KzLook — Curated by You</p>
      </footer>
    </div>
  );
}