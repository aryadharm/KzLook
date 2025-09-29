// src/components/SearchModal.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function SearchModal({ isOpen, onClose }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return PRODUCTS.slice(0, 12);
    const s = q.toLowerCase();
    return PRODUCTS.filter(
      p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || (p.category||"").toLowerCase().includes(s)
    ).slice(0, 20);
  }, [q]);

  const go = (id) => { onClose?.(); navigate(`/product/${id}`); };
  const onSubmit = (e) => { e.preventDefault(); if (results.length) go(results[0].id); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/60 z-50" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-2xl"
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            <div className="bg-black border border-white/25 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.08)]">
              <form onSubmit={onSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-white/15">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                <input autoFocus value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products, brand, category…"
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/40" />
                <button type="submit" className="px-3 py-1.5 rounded-md bg-white text-black text-sm font-medium hover:bg-gray-200">Search</button>
              </form>

              <ul className="max-h-[50vh] overflow-y-auto divide-y divide-white/10">
                {results.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => go(r.id)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-white/60">{r.brand}{r.price ? ` • ${r.price}` : ""}</p>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded border border-white/20">View</span>
                    </button>
                  </li>
                ))}
                {results.length === 0 && <li className="px-4 py-6 text-center text-white/60">No results</li>}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
