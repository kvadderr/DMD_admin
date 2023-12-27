import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Category } from '../../@types/entity/Category';

type ModalState = {
  isCategoryOpen: boolean;
  selectedCategory: Category | null;
};

const slice = createSlice({
  name: 'modal',
  initialState: {
    isCategoryOpen: false,
    selectedCategory: null
  } as ModalState,
  reducers: {
    setIsCategoryOpen: (state, action) => {
      state.isCategoryOpen = !state.isCategoryOpen
      state.selectedCategory = action.payload;
    }
  },
});

export const isCategoryOpen = (state: RootState): boolean =>
  state.modalSlice.isCategoryOpen

export const selectedCategory = (state: RootState): Category | null =>
  state.modalSlice.selectedCategory

export const { setIsCategoryOpen } = slice.actions;

export default slice.reducer;
