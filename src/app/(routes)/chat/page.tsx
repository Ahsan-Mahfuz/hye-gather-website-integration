// 'use client'
// import { useSearchParams } from 'next/navigation'
// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import ChatApp from '@/components/chatConversation/ChatApp'
// import { useGetConversationIdQuery } from '@/redux/chatConversationApis'
// import { setSelectedConversation } from '@/redux/ChatReduxSlide'

// const ChatPage: React.FC = () => {
//   const searchParams = useSearchParams()
//   const dispatch = useDispatch()
//   const { data: conversations } = useGetConversationIdQuery()

//   useEffect(() => {
//     const selectedConversationId = searchParams.get('conversationId')

//     if (selectedConversationId && conversations) {
//       const selectedConv = conversations?.data?.find(
//         (conv: any) => conv._id === selectedConversationId
//       )
//       if (selectedConv) {
//         dispatch(setSelectedConversation(selectedConv))
//       }
//     }
//   }, [searchParams, conversations, dispatch])

//   return <ChatApp />
// }

// export default ChatPage

// src/pages/chat/index.tsx

'use client'
import ChatWindow from '@/components/newChat/ChatWindow'
import ConversationList from '@/components/newChat/ConversationList'
import { store } from '@/redux/main/store'
import { Provider } from 'react-redux'

const ChatPage: React.FC = () => {
  return (
    // <Provider store={store}>
    <div className="flex h-screen">
      <ConversationList />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
    // </Provider>
  )
}

export default ChatPage
