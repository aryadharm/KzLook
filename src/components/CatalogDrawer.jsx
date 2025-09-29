// src/components/CatalogDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { PRODUCTS } from "../data/products";

export default function CatalogDrawer({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      (cat === "All" || p.category === cat) &&
      (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    );
  }, [query, cat]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="fixed top-0 left-0 h-full w-80 bg-black text-white border-r border-white/20 z-50 flex flex-col"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.4 }}>
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-lg font-semibold">Catalog</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 border-b border-white/20 space-y-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product..."
                className="w-full bg-black border border-white/25 rounded-md px-3 py-2 text-sm outline-none focus:border-white/60" />
              <select value={cat} onChange={(e)=>setCat(e.target.value)}
                className="w-full bg-black border border-white/25 rounded-md px-3 py-2 text-sm">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 && <p className="text-center text-gray-500 py-6">No products found</p>}
              {filtered.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} onClick={onClose}
                  className="flex items-center gap-4 p-4 border-b border-white/10 hover:bg-white/5">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-contain rounded-md bg-neutral-900" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{p.name}</h3>
                    <p className="text-xs text-gray-400">{p.brand}{p.price ? ` • ${p.price}` : ""}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
