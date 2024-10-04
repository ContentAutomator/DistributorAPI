import { BullModule } from '@nestjs/bull';
import { VideoPromptQueueProcessor } from './video-prompt-queue.processor';
import { Module } from '@nestjs/common';
import { VideoPromptQueueService } from './video-prompt-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video-prompt-queue',
    }),
  ],
  providers: [VideoPromptQueueService, VideoPromptQueueProcessor],
})
export class VideoPromptQueueModule {}
