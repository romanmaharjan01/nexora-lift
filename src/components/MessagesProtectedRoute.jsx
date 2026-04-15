import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { AdminContext } from '../contexts/AdminContext'

export function MessagesProtectedRoute({ children }) {
  const { user, loading: userLoading } = useContext(AuthContext)
  const { adminUser, loading: adminLoading } = useContext(AdminContext)

  // Wait for both contexts to load
  if (userLoading || adminLoading) {
    return <div className="loading">Loading...</div>
  }

  // Allow access if either a regular user or admin is logged in
  if (!user && !adminUser) {
    return <Navigate to="/login" replace />
  }

  return children
}
