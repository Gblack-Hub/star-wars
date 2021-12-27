import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/auth/login';
import searchReducer from './slices/dashboard/search';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    search: searchReducer,
  }
})