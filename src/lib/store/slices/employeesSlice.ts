
"use client";

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@/components/types'; 

type EmployeesState = {
  users: User[];
  deletedUsers: User[];
  total: number;
  page: number;
  limit: number;
  deletedPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: EmployeesState = {
  users: [],
  deletedUsers: [],
  total: 0,
  page: 1,
  limit: 10,
  deletedPage: 1,
  status: 'idle',
  error: null,
};


export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async ({ page, limit }: { page: number, limit: number }) => {
    const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`);
    const usersWithStatus = response.data.users.map((u: any) => ({
      ...u,
      status: Math.random() > 0.5, 
    }));
    return { users: usersWithStatus, total: response.data.total };
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setDeletedPage: (state, action: PayloadAction<number>) => {
      state.deletedPage = action.payload;
    },
    addEmployee: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload); 
      state.total += 1;
    },
    updateEmployee: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex(u => u.id === updatedUser.id);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
      }
      const deletedUserIndex = state.deletedUsers.findIndex(u => u.id === updatedUser.id);
      if (deletedUserIndex !== -1) {
          state.deletedUsers[deletedUserIndex] = updatedUser;
      }
    },
    deleteEmployee: (state, action: PayloadAction<User>) => {
      const userToDelete = action.payload;
      state.users = state.users.filter(u => u.id !== userToDelete.id);
      state.deletedUsers.unshift(userToDelete);
      state.total -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export const { setPage, setDeletedPage, addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;