# Messaging & Video Call Setup Guide

This guide explains how to set up and use the new messaging and video call features in Nexora Lift.

## Features Added

### 1. Real-time Client-to-Admin Messaging
- **Support Chat**: Clients can message the admin support team
- **Photo Sharing**: Send images directly in chats
- **Real-time Updates**: Messages appear instantly for both client and admin
- **Message Status**: Read/unread tracking

### 2. Video Calling
- **Jitsi Meet Integration**: Free, open-source video conferencing
- **Screen Sharing**: Users can share their screens
- **No signup required**: Completely free and easy to use
- **Custom Room Names**: Create or join specific meeting rooms

## Setup Instructions

### 1. Enable Firestore (if not already enabled)

```bash
npx -y firebase-tools@latest firestore:create
```

When prompted:
- Choose your region (e.g., `us-central1`)
- Choose Firestore mode (select `Native` for production)

### 2. Deploy Firestore Security Rules

The project includes security rules that control who can read/write messages. Deploy them:

```bash
npx -y firebase-tools@latest deploy --only firestore:rules
```

These rules ensure:
- Users can only see conversations they're part of
- Users can only send messages to conversations they're in
- Users can't delete other people's messages
- Admins have proper access controls

### 3. Enable Cloud Storage (for photo uploads)

Storage should be enabled by default. Verify:

```bash
npx -y firebase-tools@latest deploy --only storage
```

### 4. Update Navigation (Optional)

Add links to the messaging and video call pages in your navigation:

```jsx
<NavLink to="/messages">Messages</NavLink>
<NavLink to="/video-call">Video Call</NavLink>
```

## Usage

### Accessing Support Chat
- Path: `/messages`
- Only authenticated users can access
- Simple chat interface to contact admin support
- Send text messages and photos in real-time
- All messages are stored in Firestore for admin review

### Accessing Video Calls
- Path: `/video-call`
- Only authenticated users can access
- Create a room with a custom name or auto-generated name
- Share the room name with others to invite them
- Uses Jitsi Meet (automatically loads from the internet)

## File Structure

```
src/
├── pages/
│   ├── MessengerPage.jsx      # Chat interface
│   ├── MessengerPage.css      # Chat styling
│   ├── VideoCallPage.jsx      # Video call interface
│   └── VideoCallPage.css      # Video call styling
├── contexts/
│   └── MessagesContext.jsx    # Real-time message updates
├── utils/
│   └── messagingService.js    # Firestore operations
└── firebase-config.js          # Updated with storage
```

## Firestore Structure

```
conversations/
├── {conversationId}              # Format: {userId}_admin
│   ├── userId: "uid"             # Client user ID
│   ├── type: "client-admin"
│   ├── createdAt: timestamp
│   ├── lastMessage: "text"
│   ├── lastMessageTime: timestamp
│   └── messages/
│       ├── {messageId}
│       │   ├── senderId: "uid"
│       │   ├── senderName: "display name"
│       │   ├── text: "message text"      # For text messages
│       │   ├── type: "text" | "photo"
│       │   ├── photoUrl: "url"           # For photo messages
│       │   ├── photoPath: "path"         # For deletion
│       │   ├── timestamp: timestamp
│       │   ├── read: boolean
│       │   └── reactions: [{emoji, userId}]
```

## Security Considerations

1. **Message Privacy**: Messages are encrypted in transit (HTTPS)
2. **Access Control**: Firestore rules prevent unauthorized access
3. **Photo Storage**: Photos are stored in Cloud Storage with appropriate permissions
4. **User Authentication**: All messaging requires login

## Limitations & Future Improvements

- **Admin Dashboard**: Create an admin interface to view and respond to client messages
- **Typing Indicators**: Show when admin is typing
- **Message Search**: Search through message history
- **Voice Messages**: Record and send voice notes
- **Message Notifications**: Push notifications when admin replies
- **Conversation Categories**: Tag messages (urgent, billing, support, etc.)
- **Auto-replies**: Set auto-response messages when admin is offline
- **Message Templates**: Pre-written response templates for quick replies
- **Jitsi Meet**: Video calls use the hosted Jitsi service (can self-host if needed)

## Troubleshooting

### Photos not uploading?
- Check that Cloud Storage is enabled
- Verify the user has permission to upload to `messages/` folder
- Check browser console for detailed error messages

### Video call won't load?
- Ensure you have internet connection (Jitsi is hosted online)
- Try a different browser
- Check that `https://meet.jitsi.com` isn't blocked

### Messages not appearing?
- Check Firestore security rules are deployed
- Verify both users have the correct `participants` array in the conversation
- Check browser console for errors

### Real-time updates not working?
- Ensure Firestore is properly initialized
- Check that `MessagesProvider` is wrapping your app
- Verify network connection

## Deployment

Before deploying to Firebase Hosting:

```bash
# Build the project
npm run build

# Deploy everything
npx -y firebase-tools@latest deploy
```

This will deploy:
- The updated hosting bundle
- Firestore security rules
- Storage configuration

## Costs

- **Firestore**: Free tier includes 25k reads, 10k writes, 1GB storage per day
- **Cloud Storage**: Free tier includes 5GB storage
- **Video Calls (Jitsi)**: Completely free, no usage tracking

For production scale, monitor your usage on the Firebase Console.

## Next Steps

1. Test the messaging system locally
2. Deploy to Firebase
3. Share links with friends to test
4. Monitor Firestore usage in Firebase Console
5. Consider adding more features:
   - Typing indicators
   - Message read receipts
   - User status/online indicators
   - Message search
   - Voice/audio messages
