import { baseApi } from './base-api';
import { SignInResponse } from '../@types/api/response';
import { SignInDto } from '../@types/dto/auth/signin.dto';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInDto>({
      query: payload => ({
        url: '/auth/login',
        body: payload,
        method: 'POST',
      }),
    }),
  })
})

export const {
  useSignInMutation
} = authApi

export default authApi