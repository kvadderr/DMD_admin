import { Voice } from '../@types/entity/Voice';
import { baseApi } from './base-api';

const voiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllVoices: builder.query<Voice[], void>({
      query: () => ({
        url: `/voices`,
        method: 'GET',
        providesTags: ['Voice'],
      }),
    }),
    createVoice: builder.mutation<void, Partial<Voice>>({
      query: dto => ({
          url: '/voices',
          body: dto,
          method: 'POST',
      }),
    }),
    updateVoice: builder.mutation<void, Partial<Voice>>({
      query: (dto) => ({
          url: '/voices/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteVoice: builder.mutation<any, any>({
      query: (dto) => ({
        url: `/voices/`+dto.id,
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