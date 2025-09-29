// src/pages/frontpages/Dashboard.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, findByNameBrand } from "../../data/products";

import slideshowImg1 from '../../assets/1.png';
import slideshowImg2 from '../../assets/2.png';
import slideshowImg3 from '../../assets/3.png';

const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { y: -20, opacity: 0 },
};

const fadeSection = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const marqueeVariants = (distance = 1200, duration = 28) => ({
  animate: {
    x: [0, -distance],
    transition: { x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" } },
  },
});

function MarqueeSeparator({ text = 'NEW', theme = 'dark' }) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-black' : 'bg-white';
  const fg = isDark ? 'text-white' : 'text-black';
  const border = isDark ? 'border-y border-gray-800' : 'border-y border-gray-200';
  const content = `${text} / `.repeat(18);
  return (
    <motion.div className={`w-full ${bg} ${fg} ${border} overflow-x-hidden select-none`}
      initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} variants={fadeSection} aria-hidden="true">
      <motion.div className="flex flex-nowrap py-3" variants={marqueeVariants()} animate="animate">
        <span className="text-xl font-semibold uppercase mx-6 flex-shrink-0 tracking-wider">{content}</span>
        <span className="text-xl font-semibold uppercase mx-6 flex-shrink-0 tracking-wider">{content}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const outfits = PRODUCTS;

  // mapping slideshow → product target
  const featuredSlides = useMemo(() => ([
    { img: slideshowImg1, target: findByNameBrand("Ayanami Rei Kemeja Stripe", "Poseidon Reprisal") },
    { img: slideshowImg2, target: findByNameBrand("Madness Mind Cargo", "Pluviophile") },
    { img: slideshowImg3, target: findByNameBrand("Ramiel Attack Oversized Shirt", "aftersundays") },
  ]), []);

  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % featuredSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  const categories = ['All', ...new Set(outfits.map(item => item.category))];
  const filteredOutfits = activeFilter === 'All' ? outfits : outfits.filter(item => item.category === activeFilter);
  const handleFilterChange = (category) => { setActiveFilter(category); setVisibleCount(12); };

  useEffect(() => {
    if (visibleCount > 12) {
      const t = setTimeout(() => { loadMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  const loadMoreProducts = () => setVisibleCount(prev => prev + 12);
  const handleWishlistToggle = (fit) => {
    if (isInWishlist(fit.id)) removeFromWishlist(fit.id);
    else addToWishlist(fit);
  };

  // klik slideshow → ke produk target (kalau ada)
  const goFeatured = () => {
    const target = featuredSlides[currentImageIndex]?.target;
    if (target?.id) navigate(`/product/${target.id}`);
  };

  return (
    <div>
      {/* PAGE 1 */}
      <motion.section id="homepage-section" className="h-screen flex items-center justify-center text-center relative overflow-hidden"
        initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} variants={fadeSection}>
        <video src="/Kz.mp4" autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      </motion.section>

      {/* separator NEW */}
      <MarqueeSeparator text="NEW" theme="dark" />

      {/* PAGE 2 — slideshow clickable */}
      <motion.section
        id="just-dropped-section"
        className="relative h-screen w-full flex items-center justify-center text-center cursor-pointer"
        onClick={goFeatured}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeSection}
      >
        <motion.img
          key={currentImageIndex}
          src={featuredSlides[currentImageIndex].img}
          alt="New Arrival"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <h2 className="relative z-20 text-4xl font-bold uppercase text-white tracking-widest">
          Just Dropped
        </h2>
        {/* hint klik */}
        <span className="absolute bottom-10 z-20 text-white/80 text-xs tracking-widest">
          CLICK TO VIEW PRODUCT
        </span>
      </motion.section>

      {/* separator OUTFIT */}
      <MarqueeSeparator text="OUTFIT" theme="light" />

      {/* PAGE 3 (grid 16:9) */}
      <motion.section id="bestpick-section" className="py-14 md:py-20 px-4 md:px-8"
        initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={fadeSection}>
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:[grid-template-columns:150px_1fr] gap-6">
            <div className="hidden lg:block">
              <div className="sticky top-24 h-[56vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.h2 key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                    className="text-7xl xl:text-8xl font-black uppercase"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {activeFilter === 'All' ? 'BestPick' : activeFilter}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex justify-center lg:justify-start flex-wrap gap-2 mb-8">
                {categories.map(category => (
                  <button key={category} onClick={() => handleFilterChange(category)}
                    className={`px-5 py-2 uppercase text-xs font-semibold border rounded-full transition-colors ${
                      activeFilter === category ? 'bg-white text-black border-white' : 'bg-transparent text-white border-gray-600 hover:border-white'
                    }`}>
                    {category}
                  </button>
                ))}
              </div>

              <motion.div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <AnimatePresence>
                  {filteredOutfits.slice(0, visibleCount).map((fit) => {
                    const wish = isInWishlist(fit.id);
                    return (
                      <motion.div key={fit.id} variants={gridItemVariants} initial="hidden" whileInView="show"
                        viewport={{ once: false, amount: 0.2 }} exit="exit" layout
                        className="group relative bg-white text-black border border-gray-800">
                        <Link to={`/product/${fit.id}`} className="block overflow-hidden">
                          <div className="w-full aspect-video bg-gray-200">
                            <img src={fit.image} alt={fit.name} className="w-full h-full object-contain" />
                          </div>
                        </Link>
                        <div className="p-3 flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-sm uppercase text-black">{fit.name}</h3>
                            <p className="text-gray-500 text-xs">{fit.brand}</p>
                            {fit.price && <p className="text-black font-medium mt-1 text-sm">{fit.price}</p>}
                          </div>
                          <button onClick={() => handleWishlistToggle(fit)} className="p-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${wish ? 'text-red-500' : 'text-gray-400'}`}
                              fill={wish ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {visibleCount < filteredOutfits.length && (
                <div className="mt-10 text-center" ref={loadMoreRef}>
                  <motion.button onClick={loadMoreProducts}
                    className="bg-white text-black font-bold uppercase px-7 py-3 rounded-full hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Load More
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
