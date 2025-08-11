import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserTableData, UserFilters, UserStats, UserCreateData, UserUpdateData } from '../types/user.types';
import { userService } from '../services/userService';
import { PaginatedResponse } from '../types/common.types';

// Async thunks
export const fetchUsers = createAsyncThunk<
  PaginatedResponse<UserTableData>,
  { filters?: UserFilters; page?: number; limit?: number },
  { rejectValue: string }
>(
  'user/fetchUsers',
  async ({ filters, page, limit }, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers(filters, page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk<
  UserTableData,
  UserCreateData,
  { rejectValue: string }
>(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const user = await userService.createUser(userData);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk<
  UserTableData,
  { userId: string; userData: UserUpdateData },
  { rejectValue: string }
>(
  'user/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const user = await userService.updateUser(userId, userData);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const success = await userService.deleteUser(userId);
      if (success) {
        return userId;
      }
      throw new Error('Failed to delete user');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserStats = createAsyncThunk<
  UserStats,
  void,
  { rejectValue: string }
>(
  'user/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await userService.getUserStats();
      return stats;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// State interface
interface UserState {
  users: UserTableData[];
  selectedUser: UserTableData | null;
  filters: UserFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

// Initial state
const initialState: UserState = {
  users: [],
  selectedUser: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  stats: null,
  loading: false,
  error: null,
  searchTerm: '',
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = action.payload;
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.pagination.page = 1; // Reset to first page when search changes
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when limit changes
    },
    clearError: (state) => {
      state.error = null;
    },
    resetUserState: (state) => {
      state.users = [];
      state.selectedUser = null;
      state.filters = {};
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
      };
      state.stats = null;
      state.error = null;
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.users = action.payload.data;
          if (action.payload.pagination) {
            state.pagination = {
              page: action.payload.pagination.page,
              limit: action.payload.pagination.limit,
              total: action.payload.pagination.total || 0,
            };
          }
        } else {
          state.error = action.payload.error || 'Failed to fetch users';
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // Add new user to the list
        state.users.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Update user in the list
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Update selected user if it's the same user
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove user from the list
        state.users = state.users.filter(user => user.id !== action.payload);
        state.pagination.total -= 1;
        // Clear selected user if it's the deleted user
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user stats
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedUser,
  setFilters,
  setSearchTerm,
  setPage,
  setLimit,
  clearError,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
