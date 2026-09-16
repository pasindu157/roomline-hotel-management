import React, { useState } from "react";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminHome from "./pages/admin/adminHome/AdminHome";

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
            <Outlet />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/admin/dashboard" element={<AdminHome />} />
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
