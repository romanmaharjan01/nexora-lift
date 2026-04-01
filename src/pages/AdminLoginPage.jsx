import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import './AdminPages.css';

export default function AdminLoginPage() {
  const [adminKey, setAdminKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const { adminLogin, adminError, setAdminError } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdminError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (adminLogin(adminKey)) {
      setAdminKey('');
      navigate('/admin-dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-header">
          <h2>Admin Portal</h2>
          <p className="admin-subtitle">Secure Access Only</p>
        </div>

        {adminError && <div className="admin-error-message">{adminError}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label>Admin Key</label>
            <div className="admin-key-input">
              <input
                type={showKey ? 'text' : 'password'}
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter your unique admin key"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-key-btn"
                onClick={() => setShowKey(!showKey)}
                disabled={loading}
              >
                {showKey ? '👁️‍🗨️' : '🔒'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-submit-btn"
            disabled={loading || !adminKey.trim()}
          >
            {loading ? 'Authenticating...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="admin-security-note">
          <p>🔐 This is a secure admin area. Only authorized personnel can access.</p>
        </div>
      </div>

      <div className="admin-bg-decoration"></div>
    </div>
  );
}
