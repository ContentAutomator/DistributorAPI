import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('video-prompt-queue') // The same queue name as we registered in the module
export class VideoPromptQueueProcessor {
  async processVideoPromptQueue(job: any) {
    console.log('Processing video prompt queue');
    console.log(job.data);
  }
}
