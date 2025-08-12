import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme and UI
      theme: 'light',
      sidebarCollapsed: false,
      
      // Notifications
      notifications: [],
      unreadCount: 0,
      
      // Global settings
      language: 'en',
      timezone: 'Asia/Kolkata',
      
      // Feature flags
      features: {
        analytics: true,
        notifications: true,
        fileUpload: true,
        realTime: true,
      },
      
      // Actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      })),
      
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      })),
      
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
      
      setLanguage: (language) => set({ language }),
      setTimezone: (timezone) => set({ timezone }),
      
      toggleFeature: (featureName) => set((state) => ({
        features: {
          ...state.features,
          [featureName]: !state.features[featureName],
        },
      })),
      
      // Utility methods
      getUnreadNotifications: () => {
        const state = get();
        return state.notifications.filter(n => !n.read);
      },
      
      hasFeature: (featureName) => {
        const state = get();
        return state.features[featureName] || false;
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        language: state.language,
        timezone: state.timezone,
        features: state.features,
      }),
    }
  )
);
