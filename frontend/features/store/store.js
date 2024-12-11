import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/authSlice';

export const store = configureStore({
  name: 'Thread',
  reducer: {
    user: userReducer,
  },
});
