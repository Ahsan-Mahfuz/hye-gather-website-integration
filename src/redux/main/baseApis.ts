import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './server'

export const baseApis = createApi({
  reducerPath: 'hyeGatherApis',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'conversation',
    'termsAndCondition',
    'calendar',
    'privacyPolicy',
    'faq',
    'Profile',
    'notifications',
    'business',
    'businessProfile',
    'bookings',
  ],
  endpoints: () => ({}),
})

export const chatConversationApis = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/chat' }),
  endpoints: (builder) => ({
    // Your chat-related API endpoints
  }),
})
