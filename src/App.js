import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context Providers
import { FirebaseProvider } from "./context/FirebaseContext";
import { AdminProvider } from "./context/AdminContext";

// Components
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import ProductForm from "./pages/ProductForm";
import OrderDetails from "./pages/OrderDetails";
import AdminList from "./pages/AdminList"; // New page for managing admins

// Test Page
import TestAdmin from "./pages/TestAdmin"; // Test page for admin verification

// Styles
import "./styles/admin.css";
import "./styles/sidebar.css";

// Admin Layout Component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <FirebaseProvider>
        <AdminProvider>
          <div className="App">
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  icon: "✅",
                  style: {
                    background: "#10b981",
                  },
                },
                error: {
                  duration: 4000,
                  icon: "❌",
                  style: {
                    background: "#ef4444",
                  },
                },
                loading: {
                  duration: 3000,
                  icon: "⏳",
                  style: {
                    background: "#3b82f6",
                  },
                },
              }}
            />

            <Routes>
              {/* ========== PUBLIC ROUTES ========== */}
              {/* Admin Login - No Layout */}
              <Route path="/login" element={<Login />} />

              {/* ========== TEST ROUTE - Admin Verification ========== */}
              <Route
                path="/test-admin"
                element={
                  <ProtectedRoute>
                    <TestAdmin />
                  </ProtectedRoute>
                }
              />

              {/* ========== PROTECTED ADMIN ROUTES ========== */}
              {/* Dashboard */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Products Routes */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Products />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products/new"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <ProductForm />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <ProductForm />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Orders Routes */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Orders />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <OrderDetails />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Users Routes */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Users />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Management Routes */}
              <Route
                path="/admins"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminList />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Categories Routes */}
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Categories />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subcategories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <SubCategories />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Reviews Routes */}
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Reviews />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Settings Routes */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Settings />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* ========== 404 REDIRECT ========== */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </AdminProvider>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
