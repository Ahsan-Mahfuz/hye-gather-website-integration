import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const bookingsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, void>({
      query: () => ({
        url: '/booking/get-all',
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),

    createBookings: builder.mutation<
      any,
      {
        category: string
        services: string[]
        date: string
        time: string
        number_of_guests: number
        duration: string
        additional_services: string
        business_service: string
        location: string
        event_name: string
      }
    >({
      query: (data) => {
        return {
          url: 'booking/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateBookingsMutation, useGetBookingsQuery } = bookingsApis
export default bookingsApis
