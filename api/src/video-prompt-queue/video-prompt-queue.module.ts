import { BullModule } from '@nestjs/bull';
import { VideoPromptQueueProcessor } from './video-prompt-queue.processor';
import { Module } from '@nestjs/common';
import { VideoPromptQueueService } from './video-prompt-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video-prompt-queue',
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: 6379,
      },
    }),
  ],
  exports: [VideoPromptQueueService],
  providers: [VideoPromptQueueService, VideoPromptQueueProcessor],
})
export class VideoPromptQueueModule {}
