import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      setUser: (user) => {
        console.log('🔐 AuthStore: setUser called with:', user ? {
          uid: user.uid,
          email: user.email,
          role: user.role,
          displayName: user.displayName
        } : null);
        set({ user, isAuthenticated: !!user });
        console.log('🔐 AuthStore: State after setUser:', get());
      },
      setLoading: (loading) => {
        console.log('🔐 AuthStore: setLoading called with:', loading);
        set({ loading });
      },
      setError: (error) => {
        console.log('🔐 AuthStore: setError called with:', error);
        set({ error });
      },
      logout: () => {
        console.log('🔐 AuthStore: logout called');
        set({ user: null, isAuthenticated: false, error: null });
      },
      clearError: () => {
        console.log('🔐 AuthStore: clearError called');
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
