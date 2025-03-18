import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const businessApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessData: builder.query<any, { businessId: string }>({
      query: (params) => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
          params,
        }
      },
    }),

    createBusinessService: builder.mutation<
      any,
      {
        business_category: string
        business_services: string[]
        price: number
        business: string
      }
    >({
      query: (data) => {
        return {
          url: '/business-service/create',
          method: 'POST',
          data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
    }),

    updateBusinessService: builder.mutation<
      any,
      {
        business_category: string
        business_services: string[]
        price: number
        business: string
        businessServiceId: string
        businessId: string
      }
    >({
      query: (data) => {
        const { businessServiceId, businessId } = data
        return {
          url: `/business-service/create/${businessServiceId}/${businessId}`,
          method: 'PATCH',
          data,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
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
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
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
