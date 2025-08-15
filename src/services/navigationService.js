// Navigation Service
// This service provides navigation utilities, breadcrumb generation, and route validation

import { ROUTES, hasRouteAccess, getRouteMetadata } from '../constants/routes';

class NavigationService {
  constructor() {
    this.history = null;
    this.currentLocation = null;
  }

  // Initialize the service with navigation history
  init(history, location) {
    this.history = history;
    this.currentLocation = location;
  }

  // Navigate to a specific route
  navigate(route, options = {}) {
    if (!this.history) {
      console.warn('NavigationService: History not initialized');
      return;
    }

    try {
      this.history.push(route, options.state);
    } catch (error) {
      console.error('NavigationService: Navigation failed:', error);
    }
  }

  // Navigate to a route with replacement (no back button)
  navigateReplace(route, options = {}) {
    if (!this.history) {
      console.warn('NavigationService: History not initialized');
      return;
    }

    try {
      this.history.replace(route, options.state);
    } catch (error) {
      console.error('NavigationService: Navigation failed:', error);
    }
  }

  // Go back in navigation history
  goBack() {
    if (!this.history) {
      console.warn('NavigationService: History not initialized');
      return;
    }

    try {
      this.history.goBack();
    } catch (error) {
      console.error('NavigationService: Go back failed:', error);
    }
  }

  // Go forward in navigation history
  goForward() {
    if (!this.history) {
      console.warn('NavigationService: History not initialized');
      return;
    }

    try {
      this.history.goForward();
    } catch (error) {
      console.error('NavigationService: Go forward failed:', error);
    }
  }

  // Navigate to a specific step in history
  goToStep(step) {
    if (!this.history) {
      console.warn('NavigationService: History not initialized');
      return;
    }

    try {
      this.history.go(step);
    } catch (error) {
      console.error('NavigationService: Go to step failed:', error);
    }
  }

  // Generate breadcrumbs for the current route
  generateBreadcrumbs(location, userRole) {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Always start with home
    breadcrumbs.push({
      label: 'Home',
      path: ROUTES.HOME,
      icon: 'HomeIcon',
    });

    let currentPath = '';
    
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;
      
      // Skip if this is a parameter (starts with :)
      if (segment.startsWith(':')) {
        continue;
      }

      // Find the route metadata
      const routeMetadata = getRouteMetadata(currentPath);
      
      if (routeMetadata) {
        // Check if user has access to this route
        if (hasRouteAccess(currentPath, userRole)) {
          breadcrumbs.push({
            label: routeMetadata.title,
            path: currentPath,
            icon: routeMetadata.icon,
            description: routeMetadata.description,
          });
        }
      } else {
        // Handle dynamic segments (like course IDs)
        if (segment.match(/^[a-f0-9-]+$/)) {
          // This looks like an ID, try to get context
          const parentPath = pathSegments.slice(0, i).join('/');
          if (parentPath === 'course') {
            breadcrumbs.push({
              label: 'Course Details',
              path: currentPath,
              icon: 'SchoolIcon',
              description: 'View course information',
            });
          } else if (parentPath === 'learner') {
            breadcrumbs.push({
              label: 'Learner Details',
              path: currentPath,
              icon: 'PersonIcon',
              description: 'View learner information',
            });
          }
        } else {
          // Generic segment
          breadcrumbs.push({
            label: this.capitalizeFirstLetter(segment.replace(/-/g, ' ')),
            path: currentPath,
            icon: 'FolderIcon',
          });
        }
      }
    }

    return breadcrumbs;
  }

  // Get the current route information
  getCurrentRoute(location) {
    const pathname = location.pathname;
    
    // Find exact match first
    for (const [route, metadata] of Object.entries(ROUTES)) {
      if (ROUTES[route] === pathname) {
        return {
          route: ROUTES[route],
          metadata: getRouteMetadata(ROUTES[route]),
          isExact: true,
        };
      }
    }

    // Find pattern match (for routes with parameters)
    for (const [route, routePath] of Object.entries(ROUTES)) {
      if (this.matchesRoutePattern(pathname, routePath)) {
        return {
          route: routePath,
          metadata: getRouteMetadata(routePath),
          isExact: false,
          params: this.extractRouteParams(pathname, routePath),
        };
      }
    }

    return null;
  }

  // Check if a path matches a route pattern
  matchesRoutePattern(path, routePattern) {
    const pathSegments = path.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    
    if (pathSegments.length !== patternSegments.length) {
      return false;
    }
    
    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        // This is a parameter, so it matches any value
        continue;
      }
      
      if (patternSegments[i] !== pathSegments[i]) {
        return false;
      }
    }
    
    return true;
  }

  // Extract route parameters from a path
  extractRouteParams(path, routePattern) {
    const pathSegments = path.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    const params = {};
    
    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        const paramName = patternSegments[i].substring(1);
        params[paramName] = pathSegments[i];
      }
    }
    
    return params;
  }

  // Validate if a user can access a specific route
  canAccessRoute(route, userRole) {
    return hasRouteAccess(route, userRole);
  }

  // Get all accessible routes for a user role
  getAccessibleRoutes(userRole) {
    const accessibleRoutes = [];
    
    for (const [route, metadata] of Object.entries(ROUTES)) {
      if (this.canAccessRoute(ROUTES[route], userRole)) {
        accessibleRoutes.push({
          route: ROUTES[route],
          metadata: getRouteMetadata(ROUTES[route]),
        });
      }
    }
    
    return accessibleRoutes;
  }

  // Get the parent route for a given route
  getParentRoute(route) {
    const segments = route.split('/').filter(Boolean);
    
    if (segments.length <= 1) {
      return ROUTES.HOME;
    }
    
    // Remove the last segment
    segments.pop();
    return `/${segments.join('/')}`;
  }

  // Get child routes for a given parent route
  getChildRoutes(parentRoute) {
    const childRoutes = [];
    
    for (const [route, routePath] of Object.entries(ROUTES)) {
      if (routePath.startsWith(parentRoute) && routePath !== parentRoute) {
        const remainingPath = routePath.substring(parentRoute.length);
        if (remainingPath.startsWith('/') && !remainingPath.includes('/', 1)) {
          // This is a direct child (only one level deeper)
          childRoutes.push({
            route: routePath,
            metadata: getRouteMetadata(routePath),
          });
        }
      }
    }
    
    return childRoutes;
  }

  // Utility function to capitalize first letter
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Get route title for display
  getRouteTitle(route) {
    const metadata = getRouteMetadata(route);
    return metadata ? metadata.title : this.capitalizeFirstLetter(route.split('/').pop() || 'Home');
  }

  // Get route description
  getRouteDescription(route) {
    const metadata = getRouteMetadata(route);
    return metadata ? metadata.description : '';
  }

  // Check if a route is highlighted
  isRouteHighlighted(route) {
    const metadata = getRouteMetadata(route);
    return metadata ? metadata.isHighlighted : false;
  }

  // Get route icon
  getRouteIcon(route) {
    const metadata = getRouteMetadata(route);
    return metadata ? metadata.icon : 'FolderIcon';
  }
}

// Create a singleton instance
const navigationService = new NavigationService();

export default navigationService;
export { NavigationService };
