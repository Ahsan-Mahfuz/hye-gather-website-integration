'use client'
import Loader from '@/components/loading/ReactLoader'
import ChatWindow from '@/components/newChat/ChatWindow'
import ConversationList from '@/components/newChat/ConversationList'
import { useGetProfileDataQuery } from '@/redux/profileApis'
import { User } from '@/types/chat'
import { useState, useEffect } from 'react'

const ChatPage: React.FC = () => {
  const { data: profileData } = useGetProfileDataQuery()
  const [currentUser, setCurrentUser] = useState<User | null>(profileData?.data)

  useEffect(() => {
    setCurrentUser(profileData?.data)
  }, [profileData])

  if (!currentUser) {
    return <Loader />
  }

  return (
    <div className="flex h-screen">
      <ConversationList currentUser={currentUser} />
      <ChatWindow currentUser={currentUser} />
    </div>
  )
}

export default ChatPage
