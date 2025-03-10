import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query<any, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
      providesTags: ['Profile'],
    }),

    postProfileData: builder.mutation<
      any,
      { name: string; phone: string; documents?: File; img?: string }
    >({
      query: (data) => {
        return {
          url: '/auth/update-profile',
          method: 'PATCH',
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileDataQuery, usePostProfileDataMutation } =
  privacyApis
export default privacyApis
