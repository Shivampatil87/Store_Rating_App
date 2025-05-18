import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStoresPage from './pages/admin/AdminStoresPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import StoresPage from './pages/user/StoresPage';
import StoreOwnerDashboard from './pages/store-owner/StoreOwnerDashboard';
import useAuthStore from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Protected route component
  const ProtectedRoute = ({ 
    children, 
    allowedRoles 
  }: { 
    children: React.ReactNode, 
    allowedRoles: string[] 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (user.role === 'store_owner') {
        return <Navigate to="/store-owner" replace />;
      } else {
        return <Navigate to="/stores" replace />;
      }
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes - Normal User */}
        <Route 
          path="/stores" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <StoresPage />
            </ProtectedRoute>
          } 
        />

        {/* Protected routes - Admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/stores" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminStoresPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsersPage />
            </ProtectedRoute>
          } 
        />

        {/* Protected routes - Store Owner */}
        <Route 
          path="/store-owner" 
          element={
            <ProtectedRoute allowedRoles={['store_owner']}>
              <StoreOwnerDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected routes - Any authenticated user */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin', 'store_owner']}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;