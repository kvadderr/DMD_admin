import { Middleware } from '@reduxjs/toolkit';
import { logout } from './slices/authSlice';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  const { expiresAt, isLoggedIn } = store.getState().auth;

  if (isLoggedIn && expiresAt && expiresAt < Date.now()) {
    store.dispatch(logout());
  }

  return next(action);
};

export default authMiddleware;