import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../firebase-config';

// Get or start conversation with admin
export const getAdminConversation = async (userId, userName = 'User') => {
  const conversationId = `${userId}_admin`;
  const conversationRef = doc(db, 'conversations', conversationId);
  
  try {
    console.log('[messagingService] Getting conversation:', conversationId);
    const conversationSnap = await getDoc(conversationRef);
    if (!conversationSnap.exists()) {
      // Create a new conversation
      console.log('[messagingService] Creating new conversation:', conversationId);
      await setDoc(conversationRef, {
        userId, // The client user ID
        userName, // The client's display name
        type: 'client-admin',
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: serverTimestamp(),
      });
    } else {
      console.log('[messagingService] Conversation already exists:', conversationId);
    }
  } catch (error) {
    console.error('[messagingService] Error creating/getting conversation:', error);
    throw error;
  }

  return conversationId;
};

// Send message to admin
export const sendMessageToAdmin = async (conversationId, senderId, senderName, text) => {
  try {
    console.log('[messagingService] Sending message to:', conversationId);
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const messageDoc = await addDoc(messagesRef, {
      senderId,
      senderName,
      text,
      type: 'text',
      timestamp: serverTimestamp(),
      read: false,
      reactions: [],
    });

    // Update conversation's last message
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
    });

    console.log('[messagingService] Message sent successfully:', messageDoc.id);
    return messageDoc.id;
  } catch (error) {
    console.error('[messagingService] Error sending message:', error);
    throw error;
  }
};

// Upload and send photo message to admin
export const sendPhotoMessageToAdmin = async (
  conversationId,
  senderId,
  senderName,
  photoFile
) => {
  try {
    const timestamp = new Date().getTime();
    const fileName = `${conversationId}/${timestamp}_${photoFile.name}`;
    const storageRef = ref(storage, `admin-messages/${fileName}`);

    // Upload file to storage
    const snapshot = await uploadBytes(storageRef, photoFile);
    const photoUrl = await getDownloadURL(snapshot.ref);

    // Save message to Firestore
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const messageDoc = await addDoc(messagesRef, {
      senderId,
      senderName,
      type: 'photo',
      photoUrl,
      photoPath: fileName,
      timestamp: serverTimestamp(),
      read: false,
      reactions: [],
    });

    // Update conversation's last message
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: '📷 Photo',
      lastMessageTime: serverTimestamp(),
    });

    return messageDoc.id;
  } catch (error) {
    console.error('Error sending photo:', error);
    throw error;
  }
};

// Subscribe to messages with admin in real-time
export const subscribeToAdminMessages = (conversationId, callback) => {
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      console.log(`[REAL-TIME] Updated ${conversationId} with ${messages.length} messages`);
      callback(messages);
    },
    (error) => {
      console.error(`[REAL-TIME ERROR] Failed to subscribe to ${conversationId}:`, error);
      callback([]);
    }
  );

  return unsubscribe;
}

// Get all client-admin conversations (for admin view)
export const getAdminConversations = async () => {
  try {
    const conversationsRef = collection(db, 'conversations');
    const q = query(where('type', '==', 'client-admin'), orderBy('lastMessageTime', 'desc'));
    const snapshot = await getDocs(q);

    const conversations = [];
    snapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() });
    });

    return conversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// Subscribe to admin conversations in real-time (for admin view)
export const subscribeToAdminConversations = (callback) => {
  const conversationsRef = collection(db, 'conversations');
  const q = query(
    conversationsRef,
    where('type', '==', 'client-admin'),
    orderBy('lastMessageTime', 'desc')
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const conversations = [];
      snapshot.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
      });
      console.log('[CONVERSATIONS] Updated with', conversations.length, 'conversations');
      callback(conversations);
    },
    (error) => {
      console.error('[CONVERSATIONS ERROR] Failed to subscribe:', error);
      callback([]);
    }
  );

  return unsubscribe;
};

// Mark messages as read
export const markMessagesAsRead = async (conversationId, messageIds) => {
  try {
    for (const messageId of messageIds) {
      const messageRef = doc(db, 'conversations', conversationId, 'messages', messageId);
      await updateDoc(messageRef, { read: true });
    }
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

// Delete a message
export const deleteMessage = async (conversationId, messageId, photoPath = null) => {
  try {
    // Delete photo from storage if it exists
    if (photoPath) {
      const photoRef = ref(storage, `admin-messages/${photoPath}`);
      await deleteObject(photoRef);
    }

    // Delete message from Firestore
    const messageRef = doc(db, 'conversations', conversationId, 'messages', messageId);
    await updateDoc(messageRef, { deleted: true, text: '[Message deleted]' });
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

// Add reaction to message
export const addReactionToMessage = async (conversationId, messageId, emoji, userId) => {
  try {
    const messageRef = doc(db, 'conversations', conversationId, 'messages', messageId);
    await updateDoc(messageRef, {
      reactions: arrayUnion({ emoji, userId }),
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
};
