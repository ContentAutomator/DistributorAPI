import { Module } from '@nestjs/common';
import { VideoPromptQueueService } from './video-prompt-queue.service';

@Module({
  providers: [VideoPromptQueueService]
})
export class VideoPromptQueueModule {}
