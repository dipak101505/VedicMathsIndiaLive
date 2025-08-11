import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Box } from '@mui/material';

export interface CardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className,
  elevation = 1,
}) => {
  return (
    <MuiCard 
      className={className} 
      elevation={elevation}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardHeader
        title={title}
        subheader={subtitle}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {children}
      </CardContent>
      {actions && (
        <CardActions>
          <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
            {actions}
          </Box>
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;
