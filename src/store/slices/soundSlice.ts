import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Sound } from '../../@types/entity/Sound';
import soundApi from '../../api/sound';

type SoundState = {
  sounds: Sound[];
};

const slice = createSlice({
  name: 'sound',
  initialState: {
    sounds: []
  } as SoundState,
  reducers: {
    addsound: (state, action) => {
      state.sounds.push(action.payload);
    },
    editsound: (state, action) => {
      const index = state.sounds.findIndex(sound => sound.id === action.payload.id);
      if (index !== -1) {
        state.sounds[index] = action.payload;
      }
    },
    removesound: (state, action) => {
      state.sounds = state.sounds.filter(sound => sound.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        soundApi.endpoints.getAllSound.matchFulfilled,
        (state, { payload }) => {
          state.sounds = payload;
        },
      )
  },
});

export const selectsounds = (state: RootState): Sound[] =>
state.soundSlice.sounds;


export const { addsound, editsound, removesound } = slice.actions;

export default slice.reducer;
