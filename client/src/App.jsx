import React, { useState } from "react";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HotelManage } from "./pages/admin/hotelManage/HotelManage";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./pages/admin/adminDashboard/AdminDashboard";

const Home = () => <h1>customer home page</h1>;
const ManagerDashboard = () => <h1>Manager dashboard</h1>;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "",
  );
  return (
    // ====================== public routes ==========================
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
          />
        }
      />
      {/* 🔒 CUSTOMER ONLY */}
      <Route
        element={
          isAuthenticated && userRole === "customer" ? (
            <Outlet />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/home" element={<Home />} />
      </Route>

      {/* 🔒 ADMIN ONLY  */}
      <Route
        element={
          isAuthenticated && userRole === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hotel-manage" element={<HotelManage />} />
      </Route>

      {/* 🔒 MANAGERS only */}
      <Route
        element={
          isAuthenticated && userRole === "manager" ? (
            <Outlet />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route>

      {/* ================= DEFAULT REDIRECT ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
