// src/components/WishlistDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    onClose?.();
    // Pindah ke home lalu smooth-scroll ke section page 3
    navigate("/");
    setTimeout(() => {
      document.getElementById("bestpick-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel drawer kanan */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-black text-white border-l border-white/20 z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-lg font-semibold">My Wishlist</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {/* Isi */}
            <div className="flex-1 overflow-y-auto">
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
                  <p className="text-center">Your wishlist is empty.</p>
                  <button
                    onClick={handleBrowseProducts}
                    className="mt-4 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border-b border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.price}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            onClose?.();
                            navigate(`/product/${item.id}`);
                          }}
                          className="text-xs underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-xs text-red-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer CTA ke produk */}
            {wishlistItems.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleBrowseProducts}
                  className="w-full px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
                >
                  Browse Products
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
