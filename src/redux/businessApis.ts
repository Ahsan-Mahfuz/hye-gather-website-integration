import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const businessApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessData: builder.query<any, { vendor_type: string }>({
      query: (params) => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
          params,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetBusinessDataQuery } = businessApis

export default businessApis
