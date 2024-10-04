import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { VideoDetailsDto } from '../dto';

@Injectable()
export class VideoPromptQueueService {
  constructor(
    @InjectQueue('video-prompt-queue') private entrypointQueue: Queue, // Inject the queue
  ) {}

  async add(jobData: VideoDetailsDto) {
    console.log('Adding job to the queue');
    await this.entrypointQueue.add(jobData); // Add the job to the queue
    console.log('Job added to the queue');
  }
}
