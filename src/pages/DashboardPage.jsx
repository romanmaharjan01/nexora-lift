import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import MessengerPage from './MessengerPage'
import VideoCallPage from './VideoCallPage'
import './Dashboard.css'

export function DashboardPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

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

      {/* Tabs Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          💬 Support Chat
        </button>
        <button 
          className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          📹 Video Call
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="welcome-card">
            <h2>Dashboard</h2>
            <p>You are now logged in. This is your private dashboard.</p>
            <div className="user-info">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Name:</strong> {user?.displayName || 'Not set'}</p>
              <p><strong>User ID:</strong> {user?.uid}</p>
            </div>
          </div>
        )}

        {activeTab === 'messages' && <MessengerPage />}
        {activeTab === 'video' && <VideoCallPage />}
      </div>
    </div>
  )
}
