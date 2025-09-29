// src/context/WishlistContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Membuat Context-nya
const WishlistContext = createContext();

// 2. Membuat Hook custom agar lebih mudah digunakan di komponen lain
export function useWishlist() {
  return useContext(WishlistContext);
}

// 3. Membuat Provider (komponen "pembungkus")
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fungsi untuk menambah item ke wishlist
  const addToWishlist = (product) => {
    // Cek dulu agar tidak ada produk duplikat
    if (!wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems(prevItems => [...prevItems, product]);
    }
  };

  // Fungsi untuk menghapus item dari wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Fungsi untuk mengecek apakah sebuah item sudah ada di wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}