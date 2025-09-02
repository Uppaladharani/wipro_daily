import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import StaffDashboard from './pages/staff-dashboard';
import ManagerDashboard from './pages/manager-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import LoginScreen from './pages/login-screen';
import ProductManagement from './pages/product-management';
import StockMovementRecording from './pages/stock-movement-recording';
import Reports from './pages/reports';
import UserManagement from './pages/user-management';
import Settings from "./pages/settings";

const Routes = () => {
  // Check if user is authenticated for root route
  const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
  const userRole = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');

  // Default redirect based on authentication status
  const getDefaultRoute = () => {
    if (!token) {
      return <Navigate to="/login-screen" replace />;
    }
    
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      staff: '/staff-dashboard'
    };
    
    return <Navigate to={dashboardRoutes?.[userRole] || '/login-screen'} replace />;
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Default route - redirect based on auth status */}
        <Route path="/" element={getDefaultRoute()} />
        
        {/* Login route - redirect if already authenticated */}
        <Route 
          path="/login-screen" 
          element={
            token ? (
              <Navigate to={userRole === 'admin' ? '/admin-dashboard' : 
                           userRole === 'manager'? '/manager-dashboard' : '/staff-dashboard'} replace />
            ) : (
              <LoginScreen />
            )
          } 
        />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/staff-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <StaffDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Feature Routes */}
        <Route 
          path="/product-management" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
              <ProductManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/stock-movement-recording" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'manager', 'staff']}>
              <StockMovementRecording />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
              <Reports />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/user-management" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/settings"
          element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
         }
        />

        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;