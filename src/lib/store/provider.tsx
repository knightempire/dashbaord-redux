// lib/store/provider.tsx
"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

// This component wraps your entire application, providing it with the Redux store.
// It must be a client component because it uses React's Context API via the <Provider>.
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}