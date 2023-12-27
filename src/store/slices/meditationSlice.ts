import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Meditation } from '../../@types/entity/Meditation';
import meditationApi from '../../api/meditation';

type MeditationState = {
  meditation: Meditation[];
};

const slice = createSlice({
  name: 'meditation',
  initialState: {
    meditation: []
  } as MeditationState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        meditationApi.endpoints.getAllMeditation.matchFulfilled,
        (state, { payload }) => {
          state.meditation = payload;
        },
      )
  },
});

export const selectMeditation = (state: RootState): Meditation[] =>
  state.meditationSlice.meditation;


export const { } = slice.actions;

export default slice.reducer;
