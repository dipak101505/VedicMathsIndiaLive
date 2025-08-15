import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography, 
  Box,
  Badge,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  cursor: 'pointer',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  backgroundColor: selected ? theme.palette.action.selected : 'transparent',
  
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },
}));

const ChatList = ({ 
  chats = [], 
  selectedChatId, 
  onChatSelect,
  sx = {} 
}) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    return message.length > maxLength 
      ? message.substring(0, maxLength) + '...' 
      : message;
  };

  return (
    <List sx={{ width: '100%', ...sx }}>
      {chats.map((chat) => (
        <StyledListItem
          key={chat.id}
          selected={selectedChatId === chat.id}
          onClick={() => onChatSelect(chat.id)}
          sx={{ px: 2, py: 1.5 }}
        >
          <ListItemAvatar>
            <Badge
              color={chat.online ? 'success' : 'default'}
              variant="dot"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ width: 48, height: 48, fontSize: '1.5rem' }}>
                {chat.avatar}
              </Avatar>
            </Badge>
          </ListItemAvatar>
          
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" component="span" noWrap>
                  {chat.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(chat.date)}
                </Typography>
              </Box>
            }
            secondary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  noWrap 
                  sx={{ flex: 1, mr: 1 }}
                >
                  {truncateMessage(chat.lastMessage)}
                </Typography>
                {chat.unread > 0 && (
                  <Chip
                    label={chat.unread}
                    size="small"
                    color="primary"
                    sx={{ 
                      minWidth: 20, 
                      height: 20, 
                      fontSize: '0.75rem',
                      '& .MuiChip-label': { px: 1 }
                    }}
                  />
                )}
              </Box>
            }
          />
        </StyledListItem>
      ))}
    </List>
  );
};

export default ChatList;
