import { useCreateConversationMutation } from '@/redux/chatConversationApis'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { User } from './ChatTypesDefine'
import getCurrentConversations from './GetCurrentConversation'
import { setSelectedConversation } from '@/redux/ChatReduxSlide'

export const useChatNavigation = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [createConversation] = useCreateConversationMutation()

  const startConversationWithUser = async (user: User) => {
    try {
      const existingConversations = await getCurrentConversations()
      const existingConversation = existingConversations.find(
        (conv) =>
          conv.users[1]._id === user._id || conv.users[0]._id === user._id
      )

      let conversationId
      if (existingConversation) {
        conversationId = existingConversation._id
        dispatch(setSelectedConversation(existingConversation))
      } else {
        const newConversation = await createConversation({
          user: user._id,
        }).unwrap()

        conversationId = newConversation._id
        dispatch(setSelectedConversation(newConversation))
      }
      router.push(`/chat?conversationId=${conversationId}`)
    } catch (error) {
      console.error('Failed to start conversation', error)
    }
  }

  return { startConversationWithUser }
}
