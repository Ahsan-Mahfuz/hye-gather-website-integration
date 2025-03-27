'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import MessageInput from './MessageInput'
import { useSocket } from '@/hooks/useSocket'
import { Message } from '@/types/chat'
import { RootState } from '@/redux/main/store'
import { url } from '@/redux/main/server'
import { useGetAllMessagesBetweenThemQuery } from '@/redux/chatConversationApis'
import { addMessage, setMessages } from '@/redux/chatSlice'

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch()
  const { activeConversation, currentUser, messages } = useSelector(
    (state: RootState) => state.chat
  )
  const socket = useSocket(url)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data: fetchedMessages, refetch } = useGetAllMessagesBetweenThemQuery(
    { conversation_id: activeConversation?._id || '' },
    { skip: !activeConversation }
  )

  useEffect(() => {
    if (fetchedMessages?.data) {
      dispatch(setMessages(fetchedMessages.data))
    }
  }, [fetchedMessages, dispatch])

  useEffect(() => {
    if (socket && activeConversation) {
      console.log(socket)
      const handleNewMessage = (message: Message) => {
        if (message.conversation_id === activeConversation._id) {
          dispatch(addMessage(message))
        }
      }
      socket.on('new-message', handleNewMessage)
      return () => {
        socket.off('new-message', handleNewMessage)
      }
    }
  }, [socket, activeConversation, dispatch])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!activeConversation) {
    return (
      <div className="text-center flex items-center justify-center h-[90vh]">
        Select a conversation to start chatting
      </div>
    )
  }

  const otherUser = activeConversation?.users.find(
    (user) => user._id !== currentUser?._id
  )

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gray-100 p-4 flex items-center">
        <Image
          src={`${url}/${otherUser?.img}` || '/default-avatar.png'}
          alt={otherUser?.name || 'User'}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{otherUser?.name}</h2>
      </div>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender !== otherUser?._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender !== otherUser?._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.message}
              {msg.img && (
                <Image
                  src={`${url}/${msg?.img}`}
                  alt="Message Image"
                  width={200}
                  height={200}
                  className="mt-2 rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        conversationId={activeConversation._id}
        senderId={otherUser?._id || ''}
        refetch={refetch}
        socket={socket}
      />
    </div>
  )
}

export default ChatWindow
