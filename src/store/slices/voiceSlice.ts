import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Voice } from '../../@types/entity/Voice';
import voiceApi from '../../api/voice';

type VoiceState = {
  voices: Voice[];
};

const slice = createSlice({
  name: 'voice',
  initialState: {
    voices: []
  } as VoiceState,
  reducers: {
    addVoice: (state, action) => {
      state.voices.push(action.payload);
    },
    editVoice: (state, action) => {
      const index = state.voices.findIndex(voice => voice.id === action.payload.id);
      if (index !== -1) {
        state.voices[index] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        voiceApi.endpoints.getAllVoices.matchFulfilled,
        (state, { payload }) => {
          state.voices = payload;
        },
      )
  },
});

export const selectVoices = (state: RootState): Voice[] =>
state.voiceSlice.voices;


export const { addVoice, editVoice } = slice.actions;

export default slice.reducer;
