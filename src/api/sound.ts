import { Sound } from '../@types/entity/Sound';
import { baseApi } from './base-api';

const soundApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllSound: builder.query<Sound[], void>({
      query: () => ({
        url: `/sound`,
        method: 'GET',
        providesTags: ['Sound'],
      }),
    }),
    createSound: builder.mutation<void, Partial<Sound>>({
      query: dto => ({
          url: '/sound',
          body: dto,
          method: 'POST',
      }),
    }),
    updateSound: builder.mutation<void, Partial<Sound>>({
      query: (dto) => ({
          url: '/sound/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteSound: builder.mutation<any, any>({
      query: (dto) => ({
        url: `/sound/`+dto.id,
        method: 'DELETE',
        providesTags: ['Sound'],
      }),
    }),
  })
})

export const {
  useGetAllSoundQuery,
  useCreateSoundMutation,
  useDeleteSoundMutation,
  useUpdateSoundMutation
} = soundApi

export default soundApi