import { VideoDetailsDto } from './dto';
// import Queue from 'bull';
import { OnModuleInit, Inject, Injectable } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly appGateway: AppGateway,
  ) {}

  async onModuleInit() {
    // Subscribe tới các topic từ Kafka
    this.kafkaClient.subscribeToResponseOf('notification-topic');
    await this.kafkaClient.connect();
  }

  // Nhận tin nhắn từ Kafka
  async handleMessage(message: any) {
    console.log('Received message from Kafka:', message.value);

    // Gửi thông báo tới tất cả client qua WebSocket
    this.appGateway.sendNotification(message.value);
  }
  getHello(): string {
    return 'Hello World!';
  }

  renderVideo(videoDetails: VideoDetailsDto): { message: string; job_id: string } {
    return {
      message: 'Video rendering job submitted successfully',
      job_id: '12345',
    };
  }
}
