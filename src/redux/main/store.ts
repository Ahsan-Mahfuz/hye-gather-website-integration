// import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
// import { baseApis } from './baseApis'
// import chatConversationApis from '../chatConversationApis'

// export const store = configureStore({
//   reducer: {
//     [baseApis.reducerPath]: baseApis.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApis.middleware),
// })

// setupListeners(store.dispatch)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApis, chatConversationApis } from './baseApis'
import chatReducer from '../chatSlice'

export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    [chatConversationApis.reducerPath]: chatConversationApis.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApis.middleware)
      .concat(chatConversationApis.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
