// lib/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeesReducer from './slices/employeesSlice';

export const store = configureStore({
  reducer: {
    // This is where you combine all your slices
    auth: authReducer,
    employees: employeesReducer,
  },
});

// These types are essential for using Redux with TypeScript
// They allow you to get type hints for your state and dispatch functions

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type, which includes thunk middleware
export type AppDispatch = typeof store.dispatch;