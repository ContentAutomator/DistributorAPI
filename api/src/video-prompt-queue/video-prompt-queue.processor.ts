import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('video-prompt-queue')
export class VideoPromptQueueProcessor {
  async processVideoPromptQueue(job: Job) {
    console.log('Processing video prompt queue');
    console.log(job.data);
  }
}
