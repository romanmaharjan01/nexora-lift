import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import './AdminPages.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { adminUser, adminLogout, messages, markMessageAsRead, deleteMessage, getUnreadCount, addMessage } = useContext(AdminContext);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!adminUser) {
    navigate('/admin-login');
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const handleMarkAsRead = (messageId) => {
    markMessageAsRead(messageId);
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send an email
      setReplyText('');
      setSelectedMessage(null);
      alert('Reply sent successfully!');
    }
  };

  const filteredMessages = filterStatus === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === filterStatus);

  const unreadCount = getUnreadCount();

  return (
    <div className="admin-dashboard-wrapper">
      {/* Admin Header */}
      <div className="admin-dashboard-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p className="admin-welcome">Welcome, {adminUser.name}</p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-messages-btn" onClick={() => navigate('/messages')}>
            💬 View Client Messages
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="admin-dashboard-container">
        {/* Stats Bar */}
        <div className="admin-stats-bar">
          <div className="admin-stat-card">
            <div className="stat-number">{messages.length}</div>
            <div className="stat-label">Total Messages</div>
          </div>
          <div className="admin-stat-card unread">
            <div className="stat-number">{unreadCount}</div>
            <div className="stat-label">Unread</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">{messages.filter(m => m.status === 'read').length}</div>
            <div className="stat-label">Read</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">{adminUser.role === 'administrator' ? '✓' : 'X'}</div>
            <div className="stat-label">Admin Status</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main-content">
          {/* Messages List */}
          <div className="admin-messages-panel">
            <div className="messages-header">
              <h2>Messages ({filteredMessages.length})</h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filterStatus === 'unread' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('unread')}
                >
                  Unread
                </button>
                <button
                  className={`filter-btn ${filterStatus === 'read' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('read')}
                >
                  Read
                </button>
              </div>
            </div>

            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="no-messages">No messages in this category.</div>
              ) : (
                filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`message-item ${msg.status === 'unread' ? 'unread' : ''} ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === 'unread') {
                        handleMarkAsRead(msg.id);
                      }
                    }}
                  >
                    <div className="message-sender">
                      <div className="sender-avatar">{msg.name.charAt(0)}</div>
                      <div className="sender-info">
                        <div className="sender-name">{msg.name}</div>
                        <div className="sender-email">{msg.email}</div>
                      </div>
                    </div>
                    <div className="message-preview">
                      <div className="message-subject">{msg.subject}</div>
                      <div className="message-text">{msg.message.substring(0, 60)}...</div>
                    </div>
                    <div className="message-meta">
                      <span className={`status-badge ${msg.status}`}>{msg.status}</span>
                      <span className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="admin-detail-panel">
            {selectedMessage ? (
              <>
                <div className="detail-header">
                  <h3>Message Details</h3>
                  <button
                    className="delete-msg-btn"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                  >
                    Delete
                  </button>
                </div>

                <div className="detail-content">
                  <div className="detail-field">
                    <label>From:</label>
                    <p>{selectedMessage.name} ({selectedMessage.email})</p>
                  </div>

                  <div className="detail-field">
                    <label>Subject:</label>
                    <p>{selectedMessage.subject}</p>
                  </div>

                  <div className="detail-field">
                    <label>Date:</label>
                    <p>{selectedMessage.timestamp.toLocaleString()}</p>
                  </div>

                  <div className="detail-field full-width">
                    <label>Message:</label>
                    <div className="message-body">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="reply-section">
                    <label>Reply:</label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      rows="5"
                    />
                    <div className="reply-actions">
                      <button className="send-reply-btn" onClick={handleReply}>
                        Send Reply
                      </button>
                      <button className="close-reply-btn" onClick={() => setSelectedMessage(null)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-message-selected">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
