// src/pages/frontpages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { motion } from "framer-motion";
import { getProductById, getRecommendationsByBrand } from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = getProductById(id);
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
        <Link to="/" className="underline">Kembali ke Dashboard</Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const toggleWishlist = () => (isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product));

  const recommendations = getRecommendationsByBrand(product, 4);

  return (
    <motion.div className="bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Kiri: gambar landscape */}
        <div className="flex items-center justify-center bg-black">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full object-contain aspect-video max-h-[70vh] border border-white/20 bg-neutral-900"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "tween", duration: 0.25 }}
          />
        </div>

        {/* Kanan: detail */}
        <div className="flex flex-col justify-center p-8 md:p-16 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
          <p className="text-gray-400 text-sm">Brand: {product.brand}</p>
          {product.price && <p className="text-3xl font-semibold">{product.price}</p>}
          <p className="text-gray-300 leading-relaxed">{product.desc}</p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleWishlist}
              className={`px-6 py-3 rounded-md text-sm font-semibold transition ${
                isWishlisted ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            {product.purchaseLink && (
              <a
                href={product.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md text-sm font-semibold bg-white text-black hover:bg-gray-200"
              >
                Buy Product
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Rekomendasi */}
      {recommendations.length > 0 && (
        <section className="max-w-6xl mx-auto py-12 px-4 md:px-8">
          <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group block bg-black text-white border border-white/20 rounded-md overflow-hidden 
                           transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:border-white/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-square object-contain bg-neutral-900 border-b border-white/20 transition duration-300 group-hover:scale-105"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold uppercase group-hover:text-white">{item.name}</h3>
                  <p className="text-xs text-gray-400 group-hover:text-gray-200">{item.brand}{item.price ? ` • ${item.price}` : ""}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
