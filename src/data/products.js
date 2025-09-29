// src/data/products.js
// Muat semua .png di src/assets (but Vite). KECUALI 1.png, 2.png, 3.png (khusus slideshow).
const modules = import.meta.glob('../assets/*.png', { eager: true });

let _id = 1;
const list = Object.keys(modules)
  .filter((path) => {
    const base = path.split('/').pop().replace(/\.png$/i, '');
    // exclude numeric slideshow names like "1", "2", "3"
    return !/^\d+$/.test(base);
  })
  .map((path) => {
    const url = modules[path]?.default || path;
    const filename = path.split('/').pop().replace(/\.png$/i, '');

    // Format "Nama - Brand"
    let name = filename;
    let brand = 'none';
    if (filename.includes(' - ')) {
      const [n, b] = filename.split(' - ');
      name = (n || '').trim() || filename;
      brand = (b || '').trim() || 'none';
    }

    return {
      id: _id++,
      name,
      brand,
      image: url,
      price: null,
      category: brand,
      purchaseLink: null,
      desc: `Produk ${name} oleh ${brand}.`,
    };
  });

export const PRODUCTS = list.sort((a, b) => a.name.localeCompare(b.name));

export const getProductById = (id) => PRODUCTS.find(p => p.id === Number(id));
export const getRecommendationsByBrand = (product, limit = 4) => {
  if (!product) return [];
  return PRODUCTS.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, limit);
};

// helper baru: cari berdasarkan Nama & Brand (case-insensitive)
export const findByNameBrand = (name, brand) => {
  const n = (name || '').toLowerCase();
  const b = (brand || '').toLowerCase();
  return PRODUCTS.find(p => p.name.toLowerCase() === n && p.brand.toLowerCase() === b);
};
