import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/auth/login';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})