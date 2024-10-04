import { Module, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { VideoPromptQueueModule } from './video-prompt-queue/video-prompt-queue.module';
import { VideoPromptQueueService } from './video-prompt-queue/video-prompt-queue.service';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: [process.env.KAFKA_BROKERS], // Địa chỉ Kafka broker
    //       },
    //       consumer: {
    //         groupId: 'notification-consumer', // Group ID cho Kafka consumer
    //       },
    //     },
    //   },
    // ]),
    VideoPromptQueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule implements OnModuleInit {
  // constructor(private readonly videoPromptQueueService: VideoPromptQueueService) {}

  // When the module initializes, start the recurring job
  async onModuleInit() {
    // await this.videoPromptQueueService.addTimeJob();
  }
}
