import { useSendMessageMutation } from '@/redux/chatConversationApis'
import { useEffect, useState } from 'react'
import { RiSendPlaneFill, RiImageAddLine } from 'react-icons/ri'

interface MessageInputProps {
  conversationId: string
  senderId: string
  socket: any
  refetch: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  conversationId,
  senderId,
  socket,
  refetch,
}) => {
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [sendMessage] = useSendMessageMutation()

  const handleSendMessage = async () => {
    if (!message.trim() && !imageFile) return

    const formData = new FormData()
    formData.append('conversation_id', conversationId)
    formData.append('message', message)
    formData.append('sender', senderId)

    if (imageFile) {
      formData.append('img', imageFile)
    }

    try {
      const response = await sendMessage(formData).unwrap()

      console.log(conversationId)
      console.log(senderId)
      const socketEvent = `new-message::${conversationId}-${senderId}`
      socket.emit(socketEvent)
      refetch()
      setMessage('')
      setImageFile(null)
    } catch (error) {
      console.error('Failed to send message', error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageUpload}
      />
      <label htmlFor="image-upload" className="mr-2 cursor-pointer">
        <RiImageAddLine className="text-2xl text-gray-600" />
      </label>

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg mr-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />

      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded-full"
      >
        <RiSendPlaneFill />
      </button>
    </div>
  )
}

export default MessageInput
