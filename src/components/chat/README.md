# Chat Components

This directory contains the chat interface components for the Vedic Maths India Live platform.

## Components

### ChatMessage
A reusable component for displaying individual chat messages with proper styling and avatar support.

**Features:**
- User vs instructor message styling
- Avatar display
- Timestamp formatting
- Responsive design

### ChatList
The left panel component that displays the list of available chats.

**Features:**
- Search functionality
- Chat selection
- Unread message indicators
- Online/offline status
- Last message preview
- Date formatting

### ChatWindow
The right panel component that displays the active conversation.

**Features:**
- Message display
- Input field with send functionality
- Attachment options (file, image, video, emoji)
- Voice message support
- Typing indicators
- Auto-scroll to bottom

## Usage

```jsx
import { ChatList, ChatWindow, ChatMessage } from '../../components/chat';

// In your main chat page
<ChatContainer>
  <ChatList
    chats={chats}
    selectedChat={selectedChat}
    onChatSelect={handleChatSelect}
    searchQuery={searchQuery}
    onSearchChange={handleSearchChange}
  />
  
  <ChatWindow
    selectedChat={selectedChat}
    messages={messages}
    onSendMessage={handleSendMessage}
    chatInfo={currentChatInfo}
  />
</ChatContainer>
```

## Data Structure

### Chat Object
```javascript
{
  id: number,
  title: string,
  lastMessage: string,
  date: string, // ISO date string
  avatar: string, // emoji or text
  unread: number,
  online: boolean
}
```

### Message Object
```javascript
{
  id: number,
  sender: 'user' | 'instructor' | 'admin',
  text: string,
  timestamp: string, // ISO date string
  avatar: string
}
```

## Styling

All components use Material-UI's styled API and follow the platform's design system. The chat interface includes:

- Responsive layout
- Material Design principles
- Consistent spacing and typography
- Theme-aware colors
- Smooth animations and transitions

## Future Enhancements

- Real-time messaging with WebSocket
- File upload functionality
- Message reactions
- Read receipts
- Push notifications
- Message search
- Chat history export
