import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChatList, ChatWindow } from '../../components/chat';

// Enhanced mock data
const mockChats = [
  {
    id: 1,
    title: 'Chat with Admin',
    lastMessage: 'You: Good morning Sir! I\'m doing well, how about y...',
    date: '2024-01-15T10:30:00Z',
    avatar: '👨‍💼',
    unread: 0,
    online: true
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    lastMessage: 'You: Not yet, I will complete it soon!',
    date: '2024-01-14T15:45:00Z',
    avatar: '📐',
    unread: 2,
    online: false
  },
  {
    id: 3,
    title: 'Physics for Engineers',
    lastMessage: 'Chat with Instructor',
    date: '2024-01-13T09:20:00Z',
    avatar: '✏️',
    unread: 0,
    online: true
  },
  {
    id: 4,
    title: 'Subscription 1:1 Algebra',
    lastMessage: 'Chat with Instructor',
    date: '2024-01-12T14:15:00Z',
    avatar: '🌱',
    unread: 1,
    online: true
  },
  {
    id: 5,
    title: 'Vedic Maths Basics',
    lastMessage: 'Instructor: Great progress on multiplication!',
    date: '2024-01-11T11:00:00Z',
    avatar: '🧮',
    unread: 0,
    online: false
  },
  {
    id: 6,
    title: 'Mental Arithmetic',
    lastMessage: 'You: Can you explain the Nikhilam method?',
    date: '2024-01-10T16:30:00Z',
    avatar: '🧠',
    unread: 3,
    online: true
  }
];

const mockMessagesByChat = {
  1: [
    {
      id: 1,
      sender: 'admin',
      text: 'Good morning! How can I help you today?',
      timestamp: '2024-01-15T10:00:00Z',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Good morning Sir! I\'m doing well, how about you?',
      timestamp: '2024-01-15T10:30:00Z',
      avatar: '👤'
    }
  ],
  2: [
    {
      id: 1,
      sender: 'instructor',
      text: 'Have you completed the calculus assignment?',
      timestamp: '2024-01-14T15:00:00Z',
      avatar: '📐'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Not yet, I will complete it soon!',
      timestamp: '2024-01-14T15:45:00Z',
      avatar: '👤'
    }
  ],
  3: [
    {
      id: 1,
      sender: 'instructor',
      text: 'Welcome to Physics for Engineers!',
      timestamp: '2024-01-13T09:20:00Z',
      avatar: '✏️'
    }
  ],
  4: [
    {
      id: 1,
      sender: 'instructor',
      text: 'Hello! How are you doing with the algebra problems?',
      timestamp: '2024-01-12T14:00:00Z',
      avatar: '🌱'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi! I\'m working on them. I have a question about quadratic equations.',
      timestamp: '2024-01-12T14:10:00Z',
      avatar: '👤'
    },
    {
      id: 3,
      sender: 'instructor',
      text: 'Great! What specific question do you have?',
      timestamp: '2024-01-12T14:15:00Z',
      avatar: '🌱'
    }
  ],
  5: [
    {
      id: 1,
      sender: 'instructor',
      text: 'Excellent work on the multiplication techniques!',
      timestamp: '2024-01-11T10:30:00Z',
      avatar: '🧮'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Thank you! The Nikhilam method is really helpful.',
      timestamp: '2024-01-11T10:45:00Z',
      avatar: '👤'
    },
    {
      id: 3,
      sender: 'instructor',
      text: 'Great progress on multiplication!',
      timestamp: '2024-01-11T11:00:00Z',
      avatar: '🧮'
    }
  ],
  6: [
    {
      id: 1,
      sender: 'instructor',
      text: 'Welcome to Mental Arithmetic!',
      timestamp: '2024-01-10T16:00:00Z',
      avatar: '🧠'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Can you explain the Nikhilam method?',
      timestamp: '2024-01-10T16:30:00Z',
      avatar: '👤'
    }
  ]
};

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 'calc(100vh - 120px)',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(4); // Default to Algebra chat
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(mockChats);

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current chat info
  const currentChatInfo = chats.find(chat => chat.id === selectedChat);

  // Get messages for selected chat
  useEffect(() => {
    if (selectedChat && mockMessagesByChat[selectedChat]) {
      setMessages(mockMessagesByChat[selectedChat]);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // Mark messages as read
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSendMessage = (messageText) => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: messageText,
        timestamp: new Date().toISOString(),
        avatar: '👤'
      };

      // Add message to current chat
      setMessages(prev => [...prev, newMessage]);

      // Update last message in chat list
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat 
            ? { 
                ...chat, 
                lastMessage: `You: ${messageText}`,
                date: new Date().toISOString(),
                unread: 0
              } 
            : chat
        )
      );

      // Simulate instructor response after 2 seconds
      setTimeout(() => {
        const instructorResponse = {
          id: Date.now() + 1,
          sender: 'instructor',
          text: getInstructorResponse(messageText),
          timestamp: new Date().toISOString(),
          avatar: currentChatInfo?.avatar || '👨‍🏫'
        };

        setMessages(prev => [...prev, instructorResponse]);
        
        // Update chat list with instructor's response
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === selectedChat 
              ? { 
                  ...chat, 
                  lastMessage: `${currentChatInfo?.title}: ${instructorResponse.text}`,
                  date: new Date().toISOString()
                } 
              : chat
          )
        );
      }, 2000);
    }
  };

  // Simple AI-like responses based on message content
  const getInstructorResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I help you with your studies today?';
    } else if (lowerMessage.includes('question') || lowerMessage.includes('help')) {
      return 'I\'d be happy to help! What specific topic are you struggling with?';
    } else if (lowerMessage.includes('math') || lowerMessage.includes('algebra')) {
      return 'Great question! Let me explain this step by step.';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Keep up the great work!';
    } else if (lowerMessage.includes('complete') || lowerMessage.includes('done')) {
      return 'Excellent! Let\'s move on to the next topic then.';
    } else {
      return 'That\'s interesting! Tell me more about what you\'re working on.';
    }
  };

  return (
    <ChatContainer>
      <ChatList
        chats={filteredChats}
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
  );
};

export default ChatsPage;
