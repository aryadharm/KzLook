// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState } from "react";

import CatalogDrawer from "./CatalogDrawer";
import WishlistDrawer from "./WishlistDrawer";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

return (
    <>
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 left-0 right-0 z-50 bg-black text-white"
      >
        <div className="flex justify-between items-center relative border-b border-white">
          {/* --- SISI KIRI --- */}
          <div className="flex items-center gap-4 px-6 py-4 border-r border-white">
            <button onClick={() => setOpenCatalog(true)} className="flex items-center gap-2 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="hidden sm:block text-sm font-semibold uppercase tracking-wider">Catalog</span>
            </button>
          </div>

          {/* --- TENGAH LOGO --- */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/">
              <img src="/logo.gif" alt="KzLook Animated Logo" className="h-16 w-auto"/>
            </Link>
          </div>

          {/* --- SISI KANAN --- */}
          <div className="flex items-center gap-4 sm:gap-6 px-6 py-4 border-l border-white">
            <button className="p-1" aria-label="Search" onClick={()=>setOpenSearch(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={() => setOpenWishlist(true)} className="flex items-center gap-2 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <span className="hidden sm:block text-sm font-semibold uppercase tracking-wider">Wishlist</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Drawers & Modal */}
      <CatalogDrawer isOpen={openCatalog} onClose={() => setOpenCatalog(false)} />
      <WishlistDrawer isOpen={openWishlist} onClose={() => setOpenWishlist(false)} />
      <SearchModal isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
