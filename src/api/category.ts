import { Category } from '../@types/entity/Category';
import { baseApi } from './base-api';

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => ({
        url: `/category`,
        method: 'GET',
        providesTags: ['Category'],
      }),
    }),
    createCategory: builder.mutation<void, Partial<Category>>({
      query: dto => ({
          url: '/category',
          body: dto,
          method: 'POST',
      }),
    }),
    updateCategory: builder.mutation<void, Partial<Category>>({
      query: (dto) => ({
          url: '/category/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteCategory: builder.mutation<any, any>({
      query: (dto) => ({
        url: `/category/`+dto.id,
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
        providesTags: ['Category'],
      }),
    }),
  })
})

export const {
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation
} = categoryApi

export default categoryApi