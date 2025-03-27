import { get } from 'http'
import { baseApis } from './main/baseApis'

const chatConversationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation<any, { user: string }>({
      query: (data) => {
        return {
          url: '/conversation/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['conversation'],
    }),

    getConversationId: builder.query<any, void>({
      query: () => {
        return {
          url: '/conversation/get-all',
          method: 'GET',
        }
      },
      providesTags: ['conversation'],
    }),

    sendMessage: builder.mutation<
      any,
      { message: string; conversation_id: string }
    >({
      query: (data) => {
        return {
          url: '/message/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['conversation'],
    }),

    getAllMessagesBetweenThem: builder.query<any, { conversation_id: string }>({
      query: (params) => {
        return {
          url: '/message/get-all/',
          method: 'GET',
          params,
        }
      },
      providesTags: ['conversation'],
      
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateConversationMutation,
  useGetConversationIdQuery,
  useSendMessageMutation,
  useGetAllMessagesBetweenThemQuery,
} = chatConversationApis

export default chatConversationApis
