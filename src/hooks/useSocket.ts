import { useState, useEffect } from 'react'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null)
  console.log('socet-----------------')
  useEffect(() => {
    const newSocket: typeof Socket = io(url, {
      reconnection: true,
      //  reconnectionAttempts: 5,
      reconnectionDelay: 500,
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [url])

  return socket
}
