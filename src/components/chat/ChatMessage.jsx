import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageContainer = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  flexDirection: isUser ? 'row-reverse' : 'row',
  marginBottom: theme.spacing(2),
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

const MessageBubble = styled(Paper)(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(2),
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 8,
    [isUser ? 'right' : 'left']: -8,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '8px 8px 8px 0',
    borderColor: isUser 
      ? `${theme.palette.primary.main} transparent transparent transparent`
      : `${theme.palette.background.paper} transparent transparent transparent`,
    transform: isUser ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

const MessageTime = styled(Typography)(({ theme, isUser }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
  textAlign: isUser ? 'right' : 'left',
  marginLeft: isUser ? 0 : theme.spacing(1),
  marginRight: isUser ? theme.spacing(1) : 0,
}));

const ChatMessage = ({ message, isUser, showAvatar = true }) => {
  const formatTime = (timestamp) => {
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  };

  return (
    <MessageContainer isUser={isUser}>
      {showAvatar && (
        <Avatar 
          sx={{ 
            bgcolor: isUser ? 'secondary.main' : 'primary.main',
            width: 32, 
            height: 32,
            fontSize: '0.875rem'
          }}
        >
          {message.avatar || (isUser ? '👤' : '👨‍🏫')}
        </Avatar>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <MessageBubble isUser={isUser} elevation={1}>
          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
            {message.text}
          </Typography>
        </MessageBubble>
        <MessageTime variant="caption" isUser={isUser}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </Box>
    </MessageContainer>
  );
};

export default ChatMessage;
