
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Protected route wrapper
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ color: "#fff", textAlign: "center", marginTop: "40vh" }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Placeholder routes - we'll build these next */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div style={{ color: "#fff", padding: 40 }}>🏠 Home - coming soon</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <div style={{ color: "#fff", padding: 40 }}>🛠️ Admin Dashboard - coming soon</div>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}