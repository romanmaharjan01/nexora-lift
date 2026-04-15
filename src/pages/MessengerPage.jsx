import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AdminContext } from '../contexts/AdminContext';
import { MessagesContext } from '../contexts/MessagesContext';
import {
  sendMessageToAdmin,
  sendPhotoMessageToAdmin,
  subscribeToAdminConversations,
  subscribeToAdminMessages,
} from '../utils/messagingService';
import './MessengerPage.css';

export default function MessengerPage() {
  const { user } = useContext(AuthContext);
  const { adminUser } = useContext(AdminContext);
  const { adminConversation, messages, loading } = useContext(MessagesContext);
  const [messageText, setMessageText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [sending, setSending] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConvMessages, setSelectedConvMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // For admin: subscribe to all conversations
  useEffect(() => {
    if (adminUser) {
      console.log('[MessengerPage] Admin subscribing to conversations');
      const unsubscribe = subscribeToAdminConversations((convs) => {
        console.log('[MessengerPage] Received', convs.length, 'conversations');
        setConversations(convs);
        if (!selectedConversation && convs.length > 0) {
          setSelectedConversation(convs[0].id);
        }
      });
      return unsubscribe;
    }
  }, [adminUser, selectedConversation]);

  // For admin: subscribe to selected conversation messages
  useEffect(() => {
    if (adminUser && selectedConversation) {
      console.log('[MessengerPage] Admin subscribing to messages for:', selectedConversation);
      const unsubscribe = subscribeToAdminMessages(selectedConversation, (msgList) => {
        console.log('[MessengerPage] Received', msgList.length, 'messages for conversation');
        setSelectedConvMessages(msgList);
      });
      return unsubscribe;
    } else {
      setSelectedConvMessages([]);
    }
  }, [adminUser, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConvMessages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedPhoto) return;
    
    // For users: send to admin
    if (user && !adminUser) {
      if (!adminConversation) return;
      setSending(true);
      try {
        if (selectedPhoto) {
          const file = selectedPhoto instanceof File ? selectedPhoto : null;
          if (file) {
            await sendPhotoMessageToAdmin(adminConversation, user.uid, user.displayName || 'User', file);
            setSelectedPhoto('');
          }
        }
        if (messageText.trim()) {
          await sendMessageToAdmin(adminConversation, user.uid, user.displayName || 'User', messageText);
          setMessageText('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setSending(false);
      }
    }
    // For admins: send message to client
    else if (adminUser && selectedConversation) {
      setSending(true);
      try {
        if (selectedPhoto) {
          const file = selectedPhoto instanceof File ? selectedPhoto : null;
          if (file) {
            await sendPhotoMessageToAdmin(selectedConversation, adminUser.id, adminUser.name, file);
            setSelectedPhoto('');
          }
        }
        if (messageText.trim()) {
          await sendMessageToAdmin(selectedConversation, adminUser.id, adminUser.name, messageText);
          setMessageText('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setSending(false);
      }
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  // If neither user nor admin is logged in
  if (!user && !adminUser) {
    return (
      <div className="messenger-container">
        <div className="empty-state">Please log in to access this feature</div>
      </div>
    );
  }

  // Admin view: show conversations list
  if (adminUser) {
    return (
      <div className="messenger-container admin-view">
        <div className="conversations-sidebar">
          <h2>📋 Client Messages</h2>
          <div className="conversations-list">
            {conversations.length === 0 ? (
              <p className="no-conversations">No client conversations yet</p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`conversation-item ${selectedConversation === conv.id ? 'active' : ''}`}
                >
                  <h4>{conv.userName || conv.userId || 'Client'}</h4>
                  <p className="last-msg">{conv.lastMessage || 'No messages yet'}</p>
                </div>
              ))
            )
            }
          </div>
        </div>

        <div className="messenger-main">
          {selectedConversation ? (
            <>
              <div className="messenger-header">
                <h2>💬 Support Chat</h2>
                <p className="contact-info">Conversation with client</p>
              </div>
              <div className="messages-area">
                {selectedConvMessages.length === 0 ? (
                  <div className="no-messages">No messages yet</div>
                ) : (
                  selectedConvMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message ${msg.senderId === adminUser.id ? 'sent' : 'received'}`}
                    >
                      <div className="message-sender">{msg.senderName}</div>
                      {msg.type === 'photo' && msg.photoUrl && (
                        <img src={msg.photoUrl} alt="Shared photo" className="message-photo" />
                      )}
                      {msg.text && <p className="message-text">{msg.text}</p>}
                      <span className="message-time">
                        {msg.timestamp?.toDate?.()?.toLocaleTimeString() || '...'}
                      </span>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="message-input-area">
                {selectedPhoto && typeof selectedPhoto === 'object' && (
                  <div className="selected-photo-preview">
                    <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
                    <button onClick={() => setSelectedPhoto('')}>✕</button>
                  </div>
                )}
                <div className="input-controls">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    id="photo-input"
                    hidden
                  />
                  <label htmlFor="photo-input" className="photo-btn" title="Send photo">
                    📷
                  </label>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Type your reply..."
                    className="message-input"
                    disabled={sending}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="send-btn"
                    disabled={sending || (!messageText.trim() && !selectedPhoto)}
                  >
                    {sending ? '⏳' : '📤'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">Select a conversation to reply</div>
          )}
        </div>
      </div>
    );
  }

  // User view: simple chat with admin
  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h2>💬 Support Chat</h2>
        <p className="contact-info">Chat with our support team</p>
      </div>

      <div className="messages-area">
        {messages.length === 0 && (
          <div className="no-messages">
            <p>👋 Start a conversation with our support team</p>
            <p className="hint">Send a message below to get started</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === user.uid ? 'sent' : 'received'}`}
          >
            <div className="message-sender">{msg.senderName}</div>
            {msg.type === 'photo' && msg.photoUrl && (
              <img src={msg.photoUrl} alt="Shared photo" className="message-photo" />
            )}
            {msg.text && <p className="message-text">{msg.text}</p>}
            <span className="message-time">
              {msg.timestamp?.toDate?.()?.toLocaleTimeString() || '...'}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-area">
        {selectedPhoto && typeof selectedPhoto === 'object' && (
          <div className="selected-photo-preview">
            <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
            <button onClick={() => setSelectedPhoto('')}>✕</button>
          </div>
        )}
        <div className="input-controls">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            id="photo-input"
            hidden
          />
          <label htmlFor="photo-input" className="photo-btn" title="Send photo">
            📷
          </label>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Type your message here..."
            className="message-input"
            disabled={sending}
          />
          <button
            onClick={handleSendMessage}
            className="send-btn"
            disabled={sending || (!messageText.trim() && !selectedPhoto)}
          >
            {sending ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
}
