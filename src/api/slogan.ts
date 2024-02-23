import { Slogan } from '../@types/entity/Slogan';
import { baseApi } from './base-api';

const sloganApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllSlogan: builder.query<Slogan[], void>({
      query: () => ({
        url: `/slogan`,
        method: 'GET',
        providesTags: ['Slogan'],
      }),
    }),
    createSlogan: builder.mutation<void, Partial<Slogan>>({
      query: dto => ({
          url: '/slogan',
          body: dto,
          method: 'POST',
      }),
    }),
    updateSlogan: builder.mutation<void, Partial<Slogan>>({
      query: (dto) => ({
          url: '/slogan/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteSlogan: builder.mutation<any, any>({
      query: (dto) => ({
        url: `/slogan/`+dto.id,
        method: 'DELETE',
        providesTags: ['Slogan'],
      }),
    }),
  })
})

export const {
  useGetAllSloganQuery,
  useCreateSloganMutation,
  useDeleteSloganMutation,
  useUpdateSloganMutation
} = sloganApi

export default sloganApi