import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export function DashboardPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Dashboard</h2>
          <p>You are now logged in. This is your private dashboard.</p>
          <div className="user-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Name:</strong> {user?.displayName || 'Not set'}</p>
            <p><strong>User ID:</strong> {user?.uid}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
