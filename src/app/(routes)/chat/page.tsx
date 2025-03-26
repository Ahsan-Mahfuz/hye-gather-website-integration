'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatApp from '@/components/chatConversation/ChatApp'
import { useGetConversationIdQuery } from '@/redux/chatConversationApis'
import { setSelectedConversation } from '@/redux/ChatReduxSlide'

const ChatPage: React.FC = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const { data: conversations } = useGetConversationIdQuery()

  useEffect(() => {
    const selectedConversationId = searchParams.get('conversationId')

    if (selectedConversationId && conversations) {
      const selectedConv = conversations?.data?.find(
        (conv: any) => conv._id === selectedConversationId
      )
      if (selectedConv) {
        dispatch(setSelectedConversation(selectedConv))
      }
    }
  }, [searchParams, conversations, dispatch])

  return <ChatApp />
}

export default ChatPage
