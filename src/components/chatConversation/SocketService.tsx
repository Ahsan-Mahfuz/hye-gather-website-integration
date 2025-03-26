import { url } from '@/redux/main/server'
import io, { Socket } from 'socket.io-client'
import { Message, SendMessagePayload } from './ChatTypesDefine'

class SocketService {
  private socket: Socket | null = null

  connect(token: string) {
    this.socket = io(`${url}/`, {
      auth: { token },
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  onNewMessage(callback: (message: Message) => void) {
    this.socket?.on('new-message', callback)
  }

  sendMessage(message: SendMessagePayload) {
    this.socket?.emit('send-message', message)
  }
}

// export default new SocketService();
export const socketService = new SocketService()
