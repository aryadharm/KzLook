// src/pages/frontpages/Catalog.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { id: 1, name: "T-Shirt Vlom.Cust", category: "Vintage", price: 60, priceLabel: "$60", image: "https://source.unsplash.com/800x800/?tshirt,dark,graffiti" },
  { id: 2, name: "Cardholder Vlom.Cust", category: "Accessories", price: 39, priceLabel: "$39", image: "https://source.unsplash.com/800x800/?wallet,dark" },
  { id: 3, name: "Calligraphy Backpack", category: "Accessories", price: 92, priceLabel: "$92", image: "https://source.unsplash.com/800x800/?backpack,dark,graffiti" },
  { id: 4, name: "Leather Jacket", category: "Outerwear", price: 139, priceLabel: "$139", image: "https://source.unsplash.com/800x800/?leather,jacket,dark" },
  { id: 5, name: "Sneakers Vlom.Cust", category: "Footwear", price: 69, priceLabel: "$69", image: "https://source.unsplash.com/800x800/?sneakers,dark,graffiti" },
  { id: 6, name: "Utility Cargo Pants", category: "Streetwear", price: 85, priceLabel: "$85", image: "https://source.unsplash.com/800x800/?cargo,pants,dark" },
  { id: 7, name: "Washed Denim Jeans", category: "Streetwear", price: 78, priceLabel: "$78", image: "https://source.unsplash.com/800x800/?jeans,dark" },
  { id: 8, name: "Graphic Crewneck", category: "Vintage", price: 65, priceLabel: "$65", image: "https://source.unsplash.com/800x800/?crewneck,dark" },
  { id: 9, name: "Techwear Windbreaker", category: "Outerwear", price: 110, priceLabel: "$110", image: "https://source.unsplash.com/800x800/?windbreaker,dark" },
  { id: 10, name: "Chelsea Boots", category: "Footwear", price: 120, priceLabel: "$120", image: "https://source.unsplash.com/800x800/?boots,dark" },
  { id: 11, name: "Oversized Flannel", category: "Streetwear", price: 55, priceLabel: "$55", image: "https://source.unsplash.com/800x800/?flannel,shirt" },
  { id: 12, name: "Crossbody Bag", category: "Accessories", price: 45, priceLabel: "$45", image: "https://source.unsplash.com/800x800/?crossbody,bag,dark" },
];

const categories = ["All", ...Array.from(new Set(ITEMS.map(i => i.category)))];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("relevance"); // relevance|price-asc|price-desc|name-asc

  const filtered = useMemo(() => {
    let list = ITEMS.filter(i =>
      (cat === "All" || i.category === cat) &&
      i.name.toLowerCase().includes(query.toLowerCase())
    );
    switch (sort) {
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "name-asc": list.sort((a,b)=>a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }, [query, cat, sort]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Catalog</h1>

          <div className="flex flex-1 md:flex-none items-center gap-3">
            {/* Search */}
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full md:w-64 bg-black border border-white/25 rounded-md px-3 py-2 outline-none focus:border-white/60"
            />
            {/* Category */}
            <select
              value={cat}
              onChange={(e)=>setCat(e.target.value)}
              className="bg-black border border-white/25 rounded-md px-3 py-2"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e)=>setSort(e.target.value)}
              className="bg-black border border-white/25 rounded-md px-3 py-2"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid: square, gap tipis */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filtered.map(item => (
              <motion.div key={item.id} variants={cardVariants} className="bg-white text-black border border-white/20">
                <Link to={`/product/${item.id}`} className="block group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover transition duration-300 group-hover:opacity-85"
                  />
                  <div className="p-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold uppercase">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.category}</p>
                    </div>
                    <span className="text-sm font-medium">{item.priceLabel}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No results. Try another keyword or category.
          </div>
        )}
      </div>
    </div>
  );
}
