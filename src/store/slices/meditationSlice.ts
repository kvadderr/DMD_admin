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
    addMeditation: (state, action) => {
      state.meditation.push(action.payload);
    },
    editMeditatation: (state, action) => {
      const index = state.meditation.findIndex(meditation => meditation.id === action.payload.id);
      if (index !== -1) {
        state.meditation[index] = action.payload;
      }
    },
    addMeditatationAudio: (state, action) => {
      const index = state.meditation.findIndex(meditation => meditation.id === action.payload.id);
      if (index !== -1) {
        state.meditation[index].audios.push(action.payload);
      }
    }
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


export const { addMeditation, editMeditatation, addMeditatationAudio } = slice.actions;

export default slice.reducer;
