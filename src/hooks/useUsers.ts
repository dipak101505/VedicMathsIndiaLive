import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { RootState } from '../store';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchUserStats,
  setSelectedUser,
  setFilters,
  setSearchTerm,
  setPage,
  setLimit,
  clearError,
  resetUserState,
} from '../store/userSlice';
import type { UserFilters, UserCreateData, UserUpdateData } from '../types/user.types';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    selectedUser,
    filters,
    pagination,
    stats,
    loading,
    error,
    searchTerm,
  } = useSelector((state: RootState) => state.user);

  return {
    // State
    users,
    selectedUser,
    filters,
    pagination,
    stats,
    loading,
    error,
    searchTerm,

    // Actions
    fetchUsers: (params?: { filters?: UserFilters; page?: number; limit?: number }) => {
      return dispatch(fetchUsers(params || {}));
    },

    createUser: (userData: UserCreateData) => {
      return dispatch(createUser(userData));
    },

    updateUser: (userId: string, userData: UserUpdateData) => {
      return dispatch(updateUser({ userId, userData }));
    },

    deleteUser: (userId: string) => {
      return dispatch(deleteUser(userId));
    },

    fetchUserStats: () => {
      return dispatch(fetchUserStats());
    },

    setSelectedUser: (user: any) => {
      dispatch(setSelectedUser(user));
    },

    setFilters: (newFilters: UserFilters) => {
      dispatch(setFilters(newFilters));
    },

    setSearchTerm: (term: string) => {
      dispatch(setSearchTerm(term));
    },

    setPage: (page: number) => {
      dispatch(setPage(page));
    },

    setLimit: (limit: number) => {
      dispatch(setLimit(limit));
    },

    clearError: () => {
      dispatch(clearError());
    },

    resetUserState: () => {
      dispatch(resetUserState());
    },

    // Computed values
    hasUsers: users.length > 0,
    totalPages: Math.ceil(pagination.total / pagination.limit),
    isFirstPage: pagination.page === 1,
    isLastPage: pagination.page >= Math.ceil(pagination.total / pagination.limit),
  };
};
