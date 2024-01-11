import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import authApi from '../../api/auth';


type AuthState = {
  isAuthorized: boolean;

};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: localStorage.getItem('token') ? true : false,
  } as AuthState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.isAuthorized = false;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem('token', payload.accessToken);
          state.isAuthorized = true;
        },
      )
  },
});

export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;


  export const {
    logout,
  } = slice.actions;

export default slice.reducer;
