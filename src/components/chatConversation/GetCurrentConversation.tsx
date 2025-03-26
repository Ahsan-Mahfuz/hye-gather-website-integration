import chatConversationApis from '@/redux/chatConversationApis'
import { store } from '@/redux/main/store'

const getCurrentConversations = async (): Promise<any[]> => {
  try {
    const conversationsResult = await store.dispatch(
      chatConversationApis.endpoints.getConversationId.initiate()
    )
    console.log(conversationsResult)
    if (conversationsResult.data) {
      return conversationsResult?.data?.data || []
    }
    return []
  } catch (error) {
    console.error('Failed to fetch conversations', error)
    return []
  }
}

export default getCurrentConversations
