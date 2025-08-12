import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  InputAdornment,
  Badge,
  Chip
} from '@mui/material';
import { Search, Circle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ChatListContainer = styled(Box)(({ theme }) => ({
  width: 350,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const ChatListHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const ChatItem = styled(ListItem)(({ theme, selected }) => ({
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.2s ease-in-out',
}));

const OnlineIndicator = styled(Circle)(({ theme, online }) => ({
  color: online ? theme.palette.success.main : theme.palette.grey[400],
  fontSize: '0.75rem',
  position: 'absolute',
  bottom: 2,
  right: 2,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
}));

const ChatList = ({ 
  chats, 
  selectedChat, 
  onChatSelect, 
  searchQuery, 
  onSearchChange 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAvatarColor = (title) => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'
    ];
    const index = title.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <ChatListContainer>
      <ChatListHeader>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Chats
        </Typography>
        <TextField
          fullWidth
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ mt: 1 }}
        />
      </ChatListHeader>
      
      <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            selected={selectedChat === chat.id}
            onClick={() => onChatSelect(chat.id)}
          >
            <ListItemAvatar sx={{ position: 'relative' }}>
              <Avatar 
                sx={{ 
                  bgcolor: getAvatarColor(chat.title),
                  width: 48, 
                  height: 48,
                  fontSize: '1.25rem'
                }}
              >
                {chat.avatar}
              </Avatar>
              <OnlineIndicator 
                online={chat.online} 
                sx={{ 
                  width: 12, 
                  height: 12,
                  border: `2px solid ${chat.online ? '#4caf50' : '#9e9e9e'}`
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight={selectedChat === chat.id ? 'bold' : 'normal'}
                    sx={{ flex: 1 }}
                  >
                    {chat.title}
                  </Typography>
                  {chat.unread > 0 && (
                    <Badge 
                      badgeContent={chat.unread} 
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 20,
                          minWidth: 20,
                        }
                      }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Typography 
                    variant="body2" 
                    color={chat.unread > 0 ? 'primary.main' : 'text.secondary'}
                    sx={{ 
                      noWrap: true,
                      fontWeight: chat.unread > 0 ? 'medium' : 'normal'
                    }}
                  >
                    {chat.lastMessage}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5 }}
                  >
                    {formatDate(chat.date)}
                  </Typography>
                </Box>
              }
            />
          </ChatItem>
        ))}
      </List>
    </ChatListContainer>
  );
};

export default ChatList;
