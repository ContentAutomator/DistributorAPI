import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép tất cả các nguồn gốc (có thể điều chỉnh để bảo mật hơn)
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clientSecretKeys: Map<Socket, string> = new Map();
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @SubscribeMessage('subscribe')
  handleSubscription(
    @MessageBody() data: { secret_key: string },
    @ConnectedSocket() client: Socket,
  ) {
    const secretKey = data.secret_key;
    if (secretKey) {
      console.log('Client subscribed:', client.id);
      console.log('Secret key:', secretKey);
      this.clientSecretKeys.set(client, secretKey); // Store client with its secret_key
      client.emit('notification', { message: 'Successfully subscribed!' });
    }
  }
  notifyWhenJobComplete(
    job: {
      job_id: string;
      status: string;
      video_url: string;
      thumbnail_url: string;
      message: string;
      duration: number;
      resolution: string;
      format: string;
    },
    secret_key: string,
  ) {
    let eventName = 'job_complete';
    // Send notification only to clients with the matching secret_key
    this.sendNotification(JSON.stringify(job), secret_key, eventName);
  }
  sendNotification(
    message: string,
    secret_key: string,
    eventName: string = 'notification',
  ) {
    // Send notification only to clients with the matching secret_key
    this.clientSecretKeys.forEach((clientKey, client) => {
      if (clientKey === secret_key) {
        client.emit(eventName, { message });
      }
    });
  }
  handleConnection(client: any) {
    console.log('Client connected:', client.id);
    client.emit('notification', {
      message: 'Successfully connected to the server!',
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
    if (this.clientSecretKeys.has(client)) {
      this.clientSecretKeys.delete(client);
    }
  }
}
// ### 2. **WebSocket Notification When Video Rendering is Complete**

// The WebSocket is used to notify developers when their video rendering is complete. Once the job is done, the system sends a notification message through an open WebSocket connection.

// #### **WebSocket URL:**
// `wss://yourservice.com/notifications`


// #### **WebSocket Notification (When Job is Complete):**
// Once the video rendering is complete, the server will send a message to the client through the WebSocket connection.

// ```json
// {
//   "type": "job_complete",
//   "job_id": "12345",
//   "status": "completed",
//   "video_url": "https://yourservice.com/videos/12345.mp4",
//   "thumbnail_url": "https://yourservice.com/thumbnails/12345.png",
//   "message": "Your video has been successfully rendered and is available for download.",
//   "duration": 60,
//   "resolution": "1080p",
//   "format": "mp4"
// }
// ```

// #### **Notification Parameters:**
// - `type`: The type of notification (e.g., `job_complete`).
// - `job_id`: The ID of the completed job.
// - `status`: The final status of the job (e.g., `completed`).
// - `video_url`: The URL where the rendered video can be downloaded.
// - `thumbnail_url`: A URL for the thumbnail of the rendered video.
// - `message`: A message confirming the completion of the job.
// - `duration`: The duration of the video.
// - `resolution`: The resolution of the rendered video.
// - `format`: The format of the output file.
