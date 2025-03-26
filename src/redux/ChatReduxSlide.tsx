import {
  Conversation,
  Message,
  User,
} from '@/components/chatConversation/ChatTypesDefine'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  currentUser: User | null
}

const initialState: ChatState = {
  conversations: [],
  selectedConversation: null,
  currentUser: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setSelectedConversation: (state, action: PayloadAction<Conversation>) => {
      state.selectedConversation = action.payload
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      if (state.selectedConversation) {
        state.selectedConversation.messages?.push(action.payload)
      }
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const {
  setConversations,
  setSelectedConversation,
  addNewMessage,
  setCurrentUser,
} = chatSlice.actions

export default chatSlice.reducer
