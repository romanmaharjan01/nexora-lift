import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';

export default function AdminProtectedRoute({ children }) {
  const { adminUser, adminLoading } = useContext(AdminContext);

  if (adminLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!adminUser) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
