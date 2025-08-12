import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  
  updateUser: (userId, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    )
  })),
  
  removeUser: (userId) => set((state) => ({
    users: state.users.filter(user => user.id !== userId)
  })),
  
  clearError: () => set({ error: null }),
}));
