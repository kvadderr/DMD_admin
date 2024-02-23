import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Slogan } from '../../@types/entity/Slogan';
import sloganApi from '../../api/slogan';

type SloganState = {
  slogans: Slogan[];
};

const slice = createSlice({
  name: 'slogan',
  initialState: {
    slogans: []
  } as SloganState,
  reducers: {
    addslogan: (state, action) => {
      state.slogans.push(action.payload);
    },
    editslogan: (state, action) => {
      const index = state.slogans.findIndex(slogan => slogan.id === action.payload.id);
      if (index !== -1) {
        state.slogans[index] = action.payload;
      }
    },
    removeslogan: (state, action) => {
      state.slogans = state.slogans.filter(slogan => slogan.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        sloganApi.endpoints.getAllSlogan.matchFulfilled,
        (state, { payload }) => {
          state.slogans = payload;
        },
      )
  },
});

export const selectslogans = (state: RootState): Slogan[] =>
state.sloganSlice.slogans;


export const { addslogan, editslogan, removeslogan } = slice.actions;

export default slice.reducer;
