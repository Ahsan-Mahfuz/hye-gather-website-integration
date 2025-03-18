import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

interface PriceData {
  name: string
  unit_amount: number
  quantity: number
  booking_id?: string
}

type SubscriptionType = 'MONTHLY' | 'YEARLY'
type PurposeType = 'BOOKING' | 'BASIC' | 'PREMIUM'

interface PaymentRequest {
  price_data: PriceData[]
  subscription_type: SubscriptionType
  purpose: PurposeType
  currency?: string
}

interface PaymentResponse {
  success: boolean
  message: string
  url: string
}

interface SubscriptionBenefit {
  monthly_benefits: string[]
  yearly_benefits: string[]
  monthly_price: number
  yearly_price: number
  monthly_tag: string
  yearly_tag: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface SubscriptionResponse {
  success: boolean
  message: string
  data: SubscriptionBenefit[]
}

const paymentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (data) => ({
        url: '/payment/create',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
    }),
    getSubscription: builder.query<SubscriptionResponse, void>({
      query: () => {
        return {
          url: '/subscription/get-all',
          method: 'GET',
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useCreatePaymentMutation, useGetSubscriptionQuery } = paymentApis
export default paymentApis
