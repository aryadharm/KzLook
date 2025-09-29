import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import Navbar from "../components/Navbar";
import Ticker from '../components/Ticker';
import MusicPlayer from '../components/MusicPlayer';

export default function MainLayout() {
  const [activeHeader, setActiveHeader] = useState('main');
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: 'homepage-section', header: 'main' },
      { id: 'just-dropped-section', header: 'new' },
      { id: 'bestpick-section', header: 'outfit' },
    ];

    const targets = sections
      .map(s => ({ ...s, el: document.getElementById(s.id) }))
      .filter(s => s.el);

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const matched = targets.find(t => t.el === visible.target);
      if (matched && matched.header !== activeHeader) setActiveHeader(matched.header);
    }, {
      root: null,
      threshold: [0.25, 0.5, 0.75],
      rootMargin: '-64px 0px 0px 0px',
    });

    targets.forEach(t => observerRef.current.observe(t.el));

    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

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
