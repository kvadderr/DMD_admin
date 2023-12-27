import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AuthState = {
  isAuthorized: boolean;
 
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: true
  } as AuthState,
  reducers: {
  },
  extraReducers: builder => {
  },
});

export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;


export const {  } = slice.actions;

export default slice.reducer;
