import { Meditation } from "../@types/entity/Meditation";
import { baseApi } from './base-api';

const meditationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllMeditation: builder.query<Meditation[], void>({
      query: () => ({
        url: `/meditation`,
        method: 'GET',
        providesTags: ['Category'],
      }),
    }),
  })
})

export const {
  useGetAllMeditationQuery
} = meditationApi

export default meditationApi