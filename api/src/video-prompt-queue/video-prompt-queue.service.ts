import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class VideoPromptQueueService {
  constructor(
    @InjectQueue('video-prompt-queue') private entrypointQueue: Queue, // Inject the queue
  ) {}

  async addTimeJob() {
    console.log('Adding job to the queue');
    await this.entrypointQueue.add({});
    console.log('Job added to the queue');
  }
}
