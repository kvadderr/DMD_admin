import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Category } from '../../@types/entity/Category';
import categoryApi from '../../api/category';

type CategoryState = {
  categories: Category[];
};

const slice = createSlice({
  name: 'category',
  initialState: {
    categories: []
  } as CategoryState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        categoryApi.endpoints.getAllCategory.matchFulfilled,
        (state, { payload }) => {
          state.categories = payload;
        },
      )
  },
});

export const selectCategories = (state: RootState): Category[] =>
  state.categorySlice.categories;


export const { addCategory, editCategory } = slice.actions;

export default slice.reducer;
