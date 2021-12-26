import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/auth/login';
import usersReducer from "./slices/dashboard/users"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  }
})