import { Module, OnModuleInit } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { VideoPromptQueueModule } from './video-prompt-queue/video-prompt-queue.module';
import { VideoPromptQueueService } from './video-prompt-queue/video-prompt-queue.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveRoot: '/static', // Optional, this is the base URL path
    }),
    ServeStaticModule.forRoot({
      rootPath: '/app/storage/images/composite-sequences/',
      serveRoot: '/results',
    }),
    VideoPromptQueueModule,
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
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly videoPromptQueueService: VideoPromptQueueService) {}

  // Generate a UUID v4
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  // When the module initializes, start the recurring job
  async onModuleInit() {
    // await this.videoPromptQueueService.add({
    //   'prompt': 'Create a lecture video on the topic of "Introduction to JavaScript"',
    //   'secret_key': this.uuidv4(),
    // });
  }
}
