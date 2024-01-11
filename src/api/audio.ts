import { Audio } from "../@types/entity/Audio";
import { baseApi } from './base-api';

const audioApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAudio: builder.mutation<void, Partial<Audio>>({
      query: dto => ({
          url: '/audio',
          body: dto,
          method: 'POST',
      }),
    }),
    updateAudio: builder.mutation<void, Partial<Audio>>({
      query: (dto) => ({
          url: '/audio/'+dto.id,
          body: dto,
          method: 'PATCH',
      }),
    }),
    deleteAudio: builder.mutation<any, any>({
      query: () => ({
        url: `/audio`,
        method: 'DELETE',
        providesTags: ['Audio'],
      }),
    }),
  })
})

export const {
  useCreateAudioMutation,
  useDeleteAudioMutation,
  useUpdateAudioMutation
} = audioApi

export default audioApi