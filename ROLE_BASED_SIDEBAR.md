# Role-Based Sidebar Implementation

## Overview

The VedicMathsIndiaLive application now features a dynamic, role-based sidebar that displays different navigation options based on the user's role. This implementation follows the design shown in the reference image and provides a clean, intuitive navigation experience for different user types.

**Note**: The header component has been removed since notifications and account management are now integrated directly into the sidebar for a cleaner, more focused interface.

## Features

### 🎨 Visual Design
- **Dark Theme**: Charcoal/dark blue background (#1a1a2e)
- **Branding**: "Bright Future Academy" with temple-style icon
- **White Text & Icons**: High contrast for readability
- **Hover Effects**: Subtle hover animations on menu items
- **Responsive**: Works on both desktop and mobile
- **Clean Layout**: No header - full content area with sidebar navigation

### 🔐 Role-Based Navigation

#### Parent Sidebar
- **Fees** - View and manage course fees for all learners
- **My Learners** - Expandable section with individual student access
  - **Liam Smith** - Individual learner with avatar and navigation
  - **Emma Williams** - Individual learner with avatar and navigation
- **Notifications** - System and course notifications
- **Account** - User profile and settings management

#### Student Sidebar
- **My Courses** - View enrolled courses and progress
- **All Courses** - Browse available courses
- **Activity** - Track learning progress and achievements
- **Fees** - View and manage course fees
- **Chats** - Communication with instructors
- **Notifications** - System and course notifications
- **Account** - User profile and settings management

#### Instructor Sidebar
- **Courses** - Manage assigned courses and content
- **Calendar** - View teaching schedule and appointments
- **Payouts** - Track earnings and payment history
- **Working Hours** - Monitor teaching hours and time tracking
- **Leaves** - Request and manage time off
- **Session conflicts** - Handle scheduling conflicts and issues
- **Chats** - Communication with students and staff
- **Notifications** - System and course notifications
- **Account** - User profile and settings management

#### Admin Sidebar
- **Get started** - Primary call-to-action with highlighted styling
- **Dashboard** - System overview and statistics
- **Consultations** - Video meetings and online consultations
- **1:1 courses** - Individual course management
- **Group courses** - Group class management
- **Recorded courses** - Pre-recorded content management
- **Instructors** - Teacher and staff management
- **Learners** - Student and participant management
- **Chats** - Communication system management
- **Store** - E-commerce and course marketplace
- **Analytics** - Data analysis and reporting
- **Finance** - Financial management and banking
- **Settings** - System configuration
- **Notifications** - System notifications
- **Account** - User profile and settings management

### 🧪 Demo Mode

The application includes a demo mode for testing different sidebar layouts:

1. **Access Demo Mode**: Go to the Dashboard page
2. **Role Switcher**: Use the buttons to switch between roles (Student, Parent, Instructor, Admin)
3. **Real-time Updates**: Sidebar updates immediately when switching roles
4. **Persistence**: Demo role is saved in localStorage for testing

### 🔽 Expandable Menu Items

The Parent sidebar features a unique expandable "My Learners" section:

- **Collapsible Navigation**: Click to expand/collapse learner list
- **Individual Learner Access**: Each learner has their own navigation path
- **Visual Indicators**: Expand/collapse arrows and indented sub-items
- **Avatar Integration**: Circular avatars with learner initials

### 🎯 Integrated Account Management

- **Account Section**: Located at the bottom of the sidebar
- **User Avatar**: Shows user's initial in a circular avatar
- **Profile Access**: Direct navigation to account settings
- **Visual Indicator**: Chevron arrow suggests expandable options
- **Account Menu**: Click to access Profile, Settings, and Logout options
- **Logout Functionality**: Secure logout with demo role cleanup

## Technical Implementation

### Components

- **`Sidebar.jsx`**: Main sidebar component with role-based logic and expandable menus
- **`MainLayout.jsx`**: Layout wrapper with dark theme styling (no header)
- **`Dashboard.jsx`**: Role switcher and dashboard routing
- **`StudentCourses.jsx`**: Example student-specific page

### Key Technologies

- **React Hooks**: `useState`, `useEffect` for state management
- **Material-UI**: Components and styling system including `Collapse`
- **Zustand**: State management for authentication
- **React Router**: Navigation and routing
- **Custom Hooks**: `usePermissions`, `useAuth` for role management

### State Management

```javascript
// Role determination priority
const effectiveRole = demoRole || userRole;

// Expandable menu state
const [expandedLearners, setExpandedLearners] = React.useState(true);

// Menu items based on role
const getMenuItems = () => {
  if (demoRole === 'parent' || isParent) {
    return [
      { text: 'Fees', icon: <MoneyIcon />, path: '/fees' },
      { 
        text: 'My Learners', 
        icon: <PeopleIcon />, 
        path: '/my-learners',
        hasSubItems: true,
        subItems: mockLearners
      },
      { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    ];
  }
  // ... other roles
};
```

### Expandable Menu Rendering

```javascript
const renderMenuItem = (item, index) => {
  if (item.hasSubItems) {
    return (
      <React.Fragment key={item.text}>
        {/* Parent menu item with expand/collapse */}
        <ListItemButton onClick={handleLearnersToggle}>
          {/* Icon and text */}
          {expandedLearners ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        
        {/* Collapsible sub-items */}
        <Collapse in={expandedLearners} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((learner) => (
              <ListItemButton key={learner.id}>
                <Avatar>{learner.initial}</Avatar>
                <ListItemText primary={learner.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
  // Regular menu item rendering
};
```

### Account Management & Logout

```javascript
// Account menu state management
const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

// Handle account menu interactions
const handleAccountClick = (event) => {
  setAccountMenuAnchor(event.currentTarget);
};

const handleLogout = () => {
  handleAccountMenuClose();
  logout(); // Clear authentication state
  navigate('/login'); // Redirect to login
};

// Account menu with Profile, Settings, and Logout options
<Menu
  anchorEl={accountMenuAnchor}
  open={Boolean(accountMenuAnchor)}
  onClose={handleAccountMenuClose}
  PaperProps={{
    sx: {
      backgroundColor: '#1a1a2e', // Match sidebar theme
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)',
    },
  }}
>
  <MenuItem onClick={() => navigate('/account')}>Profile</MenuItem>
  <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
  <Divider />
  <MenuItem onClick={handleLogout} sx={{ color: '#ff6b6b' }}>Logout</MenuItem>
</Menu>
```

### Logout Route Implementation

```javascript
// LogoutPage component that cleans up demo roles
const LogoutPage = () => {
  useEffect(() => {
    // Clear demo role from localStorage
    localStorage.removeItem('demoRole');
    console.log('🔧 Logout: Cleared demo role from localStorage');
  }, []);

  return <Navigate to="/login" replace />;
};

// Route configuration
<Route path="/logout" element={<LogoutPage />} />
```

## Usage

### For Developers

1. **Add New Roles**: Extend the `getMenuItems()` function in `Sidebar.jsx`
2. **Create Expandable Menus**: Use the `hasSubItems` and `subItems` pattern
3. **Create Role-Specific Pages**: Add new components in `src/pages/modules/`
4. **Update Routes**: Add new routes in `App.js`
5. **Update Permissions**: Modify `usePermissions` hook for new roles

### For Users

1. **Login**: Authenticate with your account
2. **Role Detection**: Sidebar automatically shows appropriate navigation
3. **Expandable Menus**: Click on parent items to expand sub-menus
4. **Navigation**: Click menu items to navigate to different sections
5. **Account Access**: Use the Account section at the bottom for profile management
6. **Notifications**: Access system notifications directly from the sidebar

## Customization

### Adding New Menu Items

```javascript
// In Sidebar.jsx, add to the appropriate role section
if (demoRole === 'parent' || isParent) {
  return [
    // ... existing items
    { text: 'New Feature', icon: <NewIcon />, path: '/new-feature' },
  ];
}
```

### Adding Expandable Menus

```javascript
// Create expandable menu with sub-items
{ 
  text: 'Category Name', 
  icon: <CategoryIcon />, 
  path: '/category',
  hasSubItems: true,
  subItems: [
    { id: 1, name: 'Sub Item 1', path: '/sub-item-1' },
    { id: 2, name: 'Sub Item 2', path: '/sub-item-2' },
  ]
}
```

### Styling Changes

```javascript
// Modify the dark theme colors in MainLayout.jsx
backgroundColor: '#1a1a2e', // Change this for different background

// Customize expandable menu styling
backgroundColor: 'rgba(255,255,255,0.05)', // Sub-item background
backgroundColor: 'rgba(255,255,255,0.15)', // Sub-item hover

// Content area background
backgroundColor: '#f5f5f5', // Light background for main content
```

### Icon Changes

```javascript
// Import new icons from @mui/icons-material
import { NewIcon } from '@mui/icons-material';

// Use in menu items
{ text: 'New Feature', icon: <NewIcon />, path: '/new-feature' }
```

## Testing

### Manual Testing

1. **Start Application**: `npm start`
2. **Login**: Use any valid credentials
3. **Navigate to Dashboard**: Use role switcher to test different layouts
4. **Test Expandable Menus**: Click on "My Learners" to expand/collapse
5. **Test Navigation**: Click sidebar items to verify routing
6. **Test Responsiveness**: Resize browser window for mobile testing
7. **Test Account Access**: Click on Account section at bottom

### Testing Parent Role

1. **Switch to Parent Role**: Use the role switcher
2. **Expand My Learners**: Click on "My Learners" to see sub-items
3. **Navigate to Learners**: Click on individual learner names
4. **Test Collapse**: Click again to collapse the menu

### Automated Testing

```bash
# Run tests (when implemented)
npm test

# Test specific components
npm test Sidebar
npm test Dashboard
```

## Future Enhancements

- [ ] **Role Persistence**: Save user role preferences
- [ ] **Customizable Sidebar**: User-configurable menu items
- [ ] **Theme Switching**: Light/dark theme toggle
- [ ] **Breadcrumb Navigation**: Enhanced navigation context
- [ ] **Search Functionality**: Quick navigation search
- [ ] **Keyboard Shortcuts**: Accessibility improvements
- [ ] **Dynamic Learners**: Real-time learner list updates
- [ ] **Learner Progress**: Visual progress indicators in sidebar
- [ ] **Mobile Menu**: Hamburger menu for mobile devices
- [ ] **Sidebar Collapse**: Option to collapse sidebar for more content space

## Troubleshooting

### Common Issues

1. **Sidebar Not Updating**: Check localStorage and role switcher
2. **Expandable Menus Not Working**: Verify `Collapse` component import
3. **Styling Issues**: Verify Material-UI theme configuration
4. **Navigation Errors**: Check route definitions in `App.js`
5. **Role Detection**: Verify `usePermissions` hook implementation
6. **Layout Issues**: Check that header removal didn't break layout

### Debug Mode

Enable console logging for debugging:

```javascript
// In Sidebar.jsx
console.log('Current role:', effectiveRole);
console.log('Menu items:', menuItems);
console.log('Expanded learners:', expandedLearners);
```

## Contributing

When adding new features to the sidebar:

1. **Follow the existing pattern** for role-based menu items
2. **Use expandable menus** for hierarchical navigation
3. **Test with all roles** to ensure proper functionality
4. **Update documentation** for new features
5. **Maintain accessibility** standards
6. **Add appropriate tests** for new functionality
7. **Consider mobile experience** since there's no header

---

**Last Updated**: January 2024  
**Version**: 1.2  
**Maintainer**: Development Team
