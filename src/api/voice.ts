import { Voice } from '../@types/entity/Voice';
import { baseApi } from './base-api';

const voiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllVoices: builder.query<Voice[], void>({
      query: () => ({
        url: `/voice`,
        method: 'GET',
        providesTags: ['Voice'],
      }),
    }),
    createVoice: builder.mutation<void, Voice>({
      query: dto => ({
          url: '/voice',
          body: dto,
          method: 'POST',
      }),
    }),
    updateVoice: builder.mutation<void, Partial<Voice>>({
      query: (dto) => ({
          url: '/voice/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteVoice: builder.mutation<any, any>({
      query: () => ({
        url: `/voice`,
        method: 'DELETE',
        providesTags: ['Voice'],
      }),
    }),
  })
})

export const {
  useGetAllVoicesQuery,
  useDeleteVoiceMutation,
  useCreateVoiceMutation,
  useUpdateVoiceMutation
} = voiceApi

export default voiceApi