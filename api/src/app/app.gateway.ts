import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép tất cả các nguồn gốc (có thể điều chỉnh để bảo mật hơn)
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private intervalId: NodeJS.Timeout;

  handleConnection(client: any) {
    console.log('Client connected:', client.id);

    // Gửi thông báo cho client mỗi 30 giây
    this.intervalId = setInterval(() => {
      this.server.emit('notification', { message: 'This is a notification sent every 30 seconds!' });
    }, 30000);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
