import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  Paper,
  Divider,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  Send, 
  AttachFile, 
  Mic, 
  Info, 
  MoreVert,
  EmojiEmotions,
  Image,
  Videocam
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ChatMessage from './ChatMessage';

const ChatWindowContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ChatInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.grey[50],
  backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.palette.grey[200]} 1px, transparent 0)`,
  backgroundSize: '20px 20px',
}));

const ChatInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
}));

const InputActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));

const ChatWindow = ({ 
  selectedChat, 
  messages, 
  onSendMessage, 
  chatInfo 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setNewMessage('');
      inputRef.current?.focus();
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = (event) => {
    setNewMessage(event.target.value);
    // Simulate typing indicator
    if (event.target.value && !isTyping) {
      setIsTyping(true);
    } else if (!event.target.value && isTyping) {
      setIsTyping(false);
    }
  };

  if (!selectedChat) {
    return (
      <ChatWindowContainer>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h6" color="text.secondary">
            Select a chat to start messaging
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose from the list on the left to begin a conversation
          </Typography>
        </Box>
      </ChatWindowContainer>
    );
  }

  return (
    <ChatWindowContainer>
      <ChatHeader>
        <ChatInfo>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40
            }}
          >
            {chatInfo?.avatar || '👤'}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {chatInfo?.title || 'Chat'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {chatInfo?.online ? 'Online' : 'Offline'}
            </Typography>
          </Box>
        </ChatInfo>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Chat info">
            <IconButton size="small">
              <Info />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Tooltip>
        </Box>
      </ChatHeader>

      <MessageContainer>
        {messages.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h6" color="text.secondary">
              No messages yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start the conversation by sending a message
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isUser={message.sender === 'user'}
              />
            ))}
            {isTyping && (
              <Fade in={isTyping}>
                <TypingIndicator>
                  <Typography variant="body2">
                    {chatInfo?.title || 'Someone'} is typing...
                  </Typography>
                </TypingIndicator>
              </Fade>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </MessageContainer>

      <ChatInput>
        <InputActions>
          <Tooltip title="Attach file">
            <IconButton size="small">
              <AttachFile />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add image">
            <IconButton size="small">
              <Image />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add video">
            <IconButton size="small">
              <Videocam />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add emoji">
            <IconButton size="small">
              <EmojiEmotions />
            </IconButton>
          </Tooltip>
        </InputActions>
        
        <TextField
          ref={inputRef}
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          size="small"
          sx={{ mx: 1 }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Voice message">
            <IconButton size="small">
              <Mic />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send message">
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{
                backgroundColor: newMessage.trim() ? 'primary.main' : 'transparent',
                color: newMessage.trim() ? 'white' : 'text.secondary',
                '&:hover': {
                  backgroundColor: newMessage.trim() ? 'primary.dark' : 'action.hover',
                }
              }}
            >
              <Send />
            </IconButton>
          </Tooltip>
        </Box>
      </ChatInput>
    </ChatWindowContainer>
  );
};

export default ChatWindow;
