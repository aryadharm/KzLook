// src/pages/admin/DashboardAdmin.jsx
import React from "react";

export default function DashboardAdmin() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-white/20 rounded-lg p-5">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-2xl font-semibold mt-1">12</p>
          </div>
          <div className="border border-white/20 rounded-lg p-5">
            <p className="text-gray-400 text-sm">Categories</p>
            <p className="text-2xl font-semibold mt-1">6</p>
          </div>
          <div className="border border-white/20 rounded-lg p-5">
            <p className="text-gray-400 text-sm">Wishlist Items</p>
            <p className="text-2xl font-semibold mt-1">—</p>
          </div>
        </div>

        <div className="border border-white/20 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-white/10 font-semibold">Quick Actions</div>
          <div className="p-5 flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200">Add Product</button>
            <button className="px-4 py-2 rounded-md border border-white/30 hover:border-white/60">Manage Categories</button>
            <button className="px-4 py-2 rounded-md border border-white/30 hover:border-white/60">View Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
