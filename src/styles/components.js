import { styled } from '@mui/material/styles';
import { Box, Paper, Button, TextField, Card, CardContent } from '@mui/material';

// Layout Components
export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: 'calc(100vh - 64px)', // Account for AppBar height
  backgroundColor: theme.palette.background.default,
}));

export const ContentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Card Components
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease-in-out',
  
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

export const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[2],
}));

export const SuccessCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  boxShadow: theme.shadows[2],
}));

export const WarningCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.contrastText,
  boxShadow: theme.shadows[2],
}));

export const ErrorCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  boxShadow: theme.shadows[2],
}));

// Button Components
export const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  boxShadow: theme.shadows[2],
  
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-1px)',
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderWidth: 2,
  
  '&:hover': {
    borderWidth: 2,
    transform: 'translateY(-1px)',
  },
}));

export const IconButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  minWidth: 'auto',
  width: theme.spacing(5),
  height: theme.spacing(5),
  padding: 0,
  
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// Form Components
export const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[3],
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const FormRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

// Table Components
export const TableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

export const TableHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Dashboard Components
export const StatsCard = styled(Card)(({ theme, color = 'primary' }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].contrastText,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-4px)',
  },
}));

export const DashboardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

export const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[2],
  height: '400px',
}));

// Navigation Components
export const SidebarItem = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.action.hover,
    transform: 'translateX(4px)',
  },
}));

export const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(3),
  
  '& .MuiBreadcrumbs-root': {
    fontSize: '0.875rem',
  },
}));

// Utility Components
export const Divider = styled(Box)(({ theme }) => ({
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(2, 0),
}));

export const Spacer = styled(Box)(({ theme, size = 2 }) => ({
  height: theme.spacing(size),
}));

export const FlexBox = styled(Box)(({ theme, direction = 'row', justify = 'flex-start', align = 'stretch' }) => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
}));

export const GridBox = styled(Box)(({ theme, columns = 1, gap = 2 }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: theme.spacing(gap),
}));

// Responsive utilities
export const ResponsiveBox = styled(Box)(({ theme, breakpoint = 'md' }) => ({
  [theme.breakpoints.down(breakpoint)]: {
    flexDirection: 'column',
  },
}));

export const MobileHidden = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const DesktopHidden = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
