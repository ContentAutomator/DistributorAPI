import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoPromptQueueProcessor {
  async processVideoPromptQueue(job: any) {
    console.log('Processing video prompt queue');
    console.log(job.data);
  }
}