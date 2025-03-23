import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const bookingsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, { requested_by: string }>({
      query: (params) => ({
        url: '/booking/get-all',
        method: 'GET',
        params,
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
          url: '/booking/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),

    customCreateBookings: builder.mutation<
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
        price: number
        user: string
      }
    >({
      query: (data) => {
        return {
          url: '/booking/custom_booking',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateBookingsMutation,
  useCustomCreateBookingsMutation,
  useGetBookingsQuery,
} = bookingsApis
export default bookingsApis
