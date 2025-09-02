import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [], userRole }) => {
  // Check if user is authenticated
  const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
  const storedRole = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');
  
  if (!token) {
    return <Navigate to="/login-screen" replace />;
  }
  
  // Verify JWT token (basic validation)
  try {
    const payload = JSON.parse(atob(token?.split('.')?.[1]));
    const isExpired = payload?.exp * 1000 < Date.now();
    
    if (isExpired) {
      // Token expired, clear storage and redirect
      localStorage.removeItem('inventoryms_token');
      localStorage.removeItem('inventoryms_user_role');
      localStorage.removeItem('inventoryms_user_email');
      sessionStorage.clear();
      return <Navigate to="/login-screen" replace />;
    }
  } catch (error) {
    // Invalid token, clear storage and redirect
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role');
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    return <Navigate to="/login-screen" replace />;
  }
  
  // Check role-based access
  const currentRole = userRole || storedRole;
  if (allowedRoles?.length > 0 && !allowedRoles?.includes(currentRole)) {
    // User doesn't have permission, redirect to their dashboard
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      staff: '/staff-dashboard'
    };
    return <Navigate to={dashboardRoutes?.[currentRole] || '/login-screen'} replace />;
  }
  
  return children;
};

export default ProtectedRoute;