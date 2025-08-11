import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { RootState } from '../store';
import { loginUser, logoutUser, registerUser, clearError, checkAuthState } from '../store/authSlice';
import type { LoginCredentials, RegisterData } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  const register = (userData: RegisterData) => {
    return dispatch(registerUser(userData));
  };

  const checkAuth = () => {
    return dispatch(checkAuthState());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    checkAuth,
    clearAuthError,
  };
};
