'use client'
import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  FiSearch,
  FiSend,
  FiArrowLeft,
  FiUser,
  FiMoreVertical,
} from 'react-icons/fi'
import Image from 'next/image'
import {
  useGetAllMessagesBetweenThemQuery,
  useGetConversationIdQuery,
  useSendMessageMutation,
} from '@/redux/chatConversationApis'
import { socketService } from '@/components/chatConversation/SocketService'

import { url } from '@/redux/main/server'
import { addNewMessage, setSelectedConversation } from '@/redux/ChatReduxSlide'

const ChatApp: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const { data: conversations } = useGetConversationIdQuery()
  const [sendMessage] = useSendMessageMutation()

  const selectedConversation = useSelector(
    (state: any) => state?.chat?.selectedConversation
  )
  console.log(selectedConversation)

  const { data: messages } = useGetAllMessagesBetweenThemQuery({
    conversation_id: selectedConversation?._id || '',
  })

  useEffect(() => {
    socketService.onNewMessage((message) => {
      if (message.conversation_id === selectedConversation?._id) {
        dispatch(addNewMessage(message))
      }
    })
  }, [selectedConversation, dispatch])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedConversation) {
      try {
        await sendMessage({
          message: messageInput,
          conversation_id: selectedConversation._id,
        }).unwrap()

        socketService.sendMessage({
          message: messageInput,
          conversation_id: selectedConversation._id,
        })

        setMessageInput('')
      } catch (error) {
        console.error('Failed to send message', error)
      }
    }
  }
  console.log(conversations)

  const filteredConversations =
    conversations?.data?.filter((conv) =>
      conv.users[1].name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  console.log(filteredConversations)

  return (
    <div className="flex h-[90vh] bg-gray-100">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {filteredConversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() => dispatch(setSelectedConversation(conv))}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
            >
              <Image
                src={`${url}/${conv.users[1].img}`}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4 object-cover"
                width={4000}
                height={4000}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{conv.users[1].name}</h3>
                {/* <p className="text-sm text-gray-500 truncate">
                  {conv.messages?.[conv.messages.length - 1]?.message}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-white border-b">
              <Image
                src={selectedConversation.users[1].img}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
                width={4000}
                height={4000}
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {selectedConversation.users[1].name}
                </h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
              <FiMoreVertical className="text-gray-500 cursor-pointer" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.data?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === filteredConversations?.[1]?._id
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md p-3 rounded-lg ${
                      msg.sender === filteredConversations?.[1]?._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 bg-gray-100 rounded-lg mr-4"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-full"
              >
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatApp
