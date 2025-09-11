import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Listing from "./pages/Listing";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminItemsPage from "./pages/AdminItemsPage";
import AdminItemForm from "./pages/AdminItemForm";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protect all admin pages */}
        <Route path="/admin/items" element={ <AdminRoute> <AdminItemsPage /> </AdminRoute>} />
        <Route path="/admin/items/new" element={ <AdminRoute> <AdminItemForm /> </AdminRoute>} />
        <Route path="/admin/items/edit/:id" element={ <AdminRoute> <AdminItemForm /> </AdminRoute>} />
      </Routes>
    </div>
  );
}
