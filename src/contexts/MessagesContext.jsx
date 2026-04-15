import { createContext, useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import {
  subscribeToAdminMessages,
  getAdminConversation,
} from '../utils/messagingService';

export const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [adminConversation, setAdminConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Initialize admin conversation on login
  useEffect(() => {
    if (!user) {
      setAdminConversation(null);
      setMessages([]);
      return;
    }

    const initializeConversation = async () => {
      try {
        setLoading(true);
        const userName = user.displayName || user.email || 'User';
        const conversationId = await getAdminConversation(user.uid, userName);
        setAdminConversation(conversationId);
      } catch (error) {
        console.error('Error initializing admin conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeConversation();
  }, [user]);

  // Subscribe to admin conversation messages
  useEffect(() => {
    if (!adminConversation) {
      console.log('[MessagesContext] No conversation yet');
      setMessages([]);
      return;
    }

    console.log('[MessagesContext] Setting up real-time listener for:', adminConversation);
    
    const unsubscribe = subscribeToAdminMessages(adminConversation, (messagesList) => {
      console.log('[MessagesContext] Received', messagesList.length, 'messages');
      setMessages(messagesList);

      // Calculate unread count
      const unread = messagesList.filter((msg) => !msg.read && msg.senderId !== user.uid);
      setUnreadCount(unread.length);
    });

    return () => {
      console.log('[MessagesContext] Cleaning up listener for:', adminConversation);
      unsubscribe();
    };
  }, [adminConversation, user]);

  return (
    <MessagesContext.Provider
      value={{
        adminConversation,
        messages,
        unreadCount,
        loading,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
