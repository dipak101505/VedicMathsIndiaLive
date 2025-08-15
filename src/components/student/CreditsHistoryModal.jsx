import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Modal,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

const CreditsHistoryModal = ({ 
  open, 
  onClose, 
  credits 
}) => {
  if (!credits) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="credits-history-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflow: 'auto',
          p: 3,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'black'
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}>
            Credits History
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>
            Track your session credits and transactions
          </Typography>
        </Box>

        {/* Credits Summary */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1, border: '1px solid rgba(0,0,0,0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Current Balance
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                {credits.remaining}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>
                Remaining
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                {credits.consumed}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>
                Consumed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                {credits.total}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>
                Total
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Transaction History */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Transaction History
          </Typography>
          <List sx={{ width: '100%' }}>
            {credits.history.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ px: 0, py: 2 }}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'black' }}>
                        {item.action}
                      </Typography>
                      <Chip
                        icon={item.change.startsWith('+') ? <AddIcon /> : <RemoveIcon />}
                        label={item.change}
                        size="small"
                        sx={{
                          bgcolor: item.change.startsWith('+') ? 'rgba(0,128,0,0.1)' : 'rgba(255,0,0,0.1)',
                          color: item.change.startsWith('+') ? 'green' : 'red',
                          border: `1px solid ${item.change.startsWith('+') ? 'green' : 'red'}`
                        }}
                      />
                    </Box>
                    {item.description && (
                      <Typography variant="body2" sx={{ color: 'black', mb: 1 }}>
                        {item.description}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: 'black' }}>
                      {item.date}
                    </Typography>
                  </Box>
                </ListItem>
                {index < credits.history.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreditsHistoryModal;
