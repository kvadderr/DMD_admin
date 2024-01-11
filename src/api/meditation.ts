import { Meditation } from "../@types/entity/Meditation";
import { baseApi } from './base-api';

const meditationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllMeditation: builder.query<Meditation[], void>({
      query: () => ({
        url: `/meditation`,
        method: 'GET',
        providesTags: ['Meditation'],
      }),
    }),
    createMeditation: builder.mutation<void, Partial<Meditation>>({
      query: dto => ({
          url: '/meditation',
          body: dto,
          method: 'POST',
      }),
    }),
    updateMeditation: builder.mutation<void, Partial<Meditation>>({
      query: (dto) => ({
          url: '/meditation/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteMeditation: builder.mutation<any, any>({
      query: () => ({
        url: `/meditation`,
        method: 'DELETE',
        providesTags: ['meditation'],
      }),
    }),
  })
})

export const {
  useGetAllMeditationQuery,
  useCreateMeditationMutation,
  useUpdateMeditationMutation,
  useDeleteMeditationMutation
} = meditationApi

export default meditationApi