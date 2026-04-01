import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Website Inquiry', message: 'I would like more information about your services.', timestamp: new Date(Date.now() - 3600000), status: 'unread' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', subject: 'Partnership Request', message: 'Interested in collaborating on a project.', timestamp: new Date(Date.now() - 7200000), status: 'read' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Feedback', message: 'Great work on the recent campaign!', timestamp: new Date(Date.now() - 86400000), status: 'read' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', subject: 'Support Request', message: 'Having trouble with the dashboard login.', timestamp: new Date(Date.now() - 1800000), status: 'unread' },
  ]);

  // Check for stored admin session on mount
  useEffect(() => {
    const storedAdminSession = localStorage.getItem('adminSession');
    if (storedAdminSession) {
      setAdminUser(JSON.parse(storedAdminSession));
    }
    setAdminLoading(false);
  }, []);

  // Admin login with unique key
  const adminLogin = (adminKey) => {
    setAdminError('');
    const ADMIN_KEY = 'nexora-admin-2024-key'; // Unique admin key (in production, use environment variable)
    
    if (adminKey.trim() === ADMIN_KEY) {
      const adminData = {
        id: 'admin-001',
        name: 'Admin Nexora',
        role: 'administrator',
        loginTime: new Date(),
      };
      setAdminUser(adminData);
      localStorage.setItem('adminSession', JSON.stringify(adminData));
      return true;
    } else {
      setAdminError('Invalid admin key. Access denied.');
      return false;
    }
  };

  // Admin logout
  const adminLogout = () => {
    setAdminUser(null);
    setMessages([]);
    localStorage.removeItem('adminSession');
  };

  // Mark message as read
  const markMessageAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
  };

  // Delete message
  const deleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  // Add new message (simulated incoming)
  const addMessage = (newMessage) => {
    const message = {
      id: messages.length + 1,
      ...newMessage,
      timestamp: new Date(),
      status: 'unread',
    };
    setMessages([message, ...messages]);
  };

  // Get unread count
  const getUnreadCount = () => {
    return messages.filter(msg => msg.status === 'unread').length;
  };

  const value = {
    adminUser,
    adminLoading,
    adminError,
    setAdminError,
    adminLogin,
    adminLogout,
    messages,
    markMessageAsRead,
    deleteMessage,
    addMessage,
    getUnreadCount,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
