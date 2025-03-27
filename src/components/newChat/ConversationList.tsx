'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/main/store'
import {
  useCreateConversationMutation,
  useGetConversationIdQuery,
} from '@/redux/chatConversationApis'
import { setActiveConversation, setConversations } from '@/redux/chatSlice'
import { url } from '@/redux/main/server'
import { useSearchParams } from 'next/navigation'

const ConversationList: React.FC = () => {
  const dispatch = useDispatch()
  //   const searchParams = useSearchParams()
  //   const conversationId = searchParams.get('conversationId')
  const { conversations, activeConversation } = useSelector(
    (state: RootState) => state.chat
  )
  const { data: conversationsData } = useGetConversationIdQuery()
  const [createConversation] = useCreateConversationMutation()

  useEffect(() => {
    if (conversationsData?.data) {
      dispatch(setConversations(conversationsData.data))
    }
  }, [conversationsData, dispatch])

  //   if (conversationId) {
  //     const handleCreateConversation = async (userId: string) => {
  //       try {
  //         const result = await createConversation({ user: userId }).unwrap()
  //       } catch (error) {
  //         console.error('Failed to create conversation', error)
  //       }
  //     }
  //     handleCreateConversation(conversationId)
  //   }

  const handleSelectConversation = (conversation: any) => {
    dispatch(setActiveConversation(conversation))
  }

  return (
    <div className="w-80 border-r h-full overflow-y-auto">
      <h2 className="p-4 text-xl font-semibold border-b">Chats</h2>
      {conversations.map((conversation) => {
        const otherUser = conversation.users.find(
          (user) => user._id !== 'conversationId' // Replace with actual current user ID
        )

        return (
          <div
            key={conversation._id}
            onClick={() => handleSelectConversation(conversation)}
            className={`
              flex items-center p-4 cursor-pointer hover:bg-gray-100 
              ${
                activeConversation?._id === conversation._id
                  ? 'bg-gray-200'
                  : ''
              }
            `}
          >
            <Image
              src={`${url}/${otherUser?.img}` || '/default-avatar.png'}
              alt={otherUser?.name || 'User'}
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">{otherUser?.name}</h3>
              <p className="text-sm text-gray-500">Last message...</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ConversationList
