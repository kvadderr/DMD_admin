import { combineReducers } from 'redux';

import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import meditationSlice from './slices/meditationSlice';
import modalSlice from './slices/modalSlice';
import voiceSlice from './slices/voiceSlice';

import categoryApi from '../api/category';
import meditationApi from '../api/meditation';
import voiceApi from '../api/voice';

export const rootReducer = combineReducers({
  [categoryApi.reducerPath]: categoryApi.reducer,
  [meditationApi.reducerPath]: meditationApi.reducer,
  [voiceApi.reducerPath]: voiceApi.reducer,
  authSlice: authSlice,
  categorySlice: categorySlice,
  meditationSlice: meditationSlice,
  modalSlice: modalSlice,
  voiceSlice: voiceSlice
});
