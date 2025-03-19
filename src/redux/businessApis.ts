import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const businessApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessData: builder.query({
      query: (params) => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
          params,
        }
      },
      providesTags: ['business', 'Profile'],
    }),

    createBusinessService: builder.mutation({
      query: (data) => {
        return {
          url: '/business-service/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),

    updateBusinessService: builder.mutation({
      query: (data) => {
        const businessServiceId = data.get('businessServiceId')
        const businessId = data.get('businessId')

        return {
          url: `/business-service/update/${businessServiceId}/${businessId}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),

    deleteBusinessService: builder.mutation<
      any,
      {
        businessServiceId: string
        businessId: string
      }
    >({
      query: (data) => {
        const { businessServiceId, businessId } = data
        return {
          url: `/business-service/delete/${businessServiceId}/${businessId}`,
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetBusinessDataQuery,
  useCreateBusinessServiceMutation,
  useUpdateBusinessServiceMutation,
  useDeleteBusinessServiceMutation,
} = businessApis

export default businessApis
