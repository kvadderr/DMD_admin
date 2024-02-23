import { combineReducers } from 'redux';

import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import meditationSlice from './slices/meditationSlice';
import modalSlice from './slices/modalSlice';
import voiceSlice from './slices/voiceSlice';

import categoryApi from '../api/category';
import meditationApi from '../api/meditation';
import voiceApi from '../api/voice';
import authApi from '../api/auth';
import sloganApi from '../api/slogan';
import sloganSlice from './slices/sloganSlice';
import soundApi from '../api/sound';
import soundSlice from './slices/soundSlice';

export const rootReducer = combineReducers({
  [categoryApi.reducerPath]: categoryApi.reducer,
  [meditationApi.reducerPath]: meditationApi.reducer,
  [voiceApi.reducerPath]: voiceApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [sloganApi.reducerPath]: sloganApi.reducer,
  [soundApi.reducerPath]: soundApi.reducer,
  
  authSlice: authSlice,
  categorySlice: categorySlice,
  meditationSlice: meditationSlice,
  modalSlice: modalSlice,
  voiceSlice: voiceSlice,
  sloganSlice: sloganSlice,
  soundSlice: soundSlice
});
