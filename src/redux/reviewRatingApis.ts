import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const reviewRatingApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      any,
      { service: string; rating: string; description: string }
    >({
      query: () => ({
        url: '/review/create',
        method: 'POST',
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query<any, { service: string; page: number }>({
      query: (data) => {
        const { service, page } = data
        return {
          url: `/review/get-all`,
          method: 'GET',
        }
      },
      providesTags: ['reviews'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateReviewMutation, useGetReviewQuery } = reviewRatingApis
export default reviewRatingApis
