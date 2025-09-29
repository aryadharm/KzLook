// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";

// NEW:
import Catalog from "./pages/frontpages/Catalog";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        {/* NEW: Catalog page */}
        <Route path="catalog" element={<Catalog />} />
      </Route>

      {/* NEW: Admin (scaffold sederhana) */}
      <Route path="/admin" element={<DashboardAdmin />} />
    </Routes>
  );
}
