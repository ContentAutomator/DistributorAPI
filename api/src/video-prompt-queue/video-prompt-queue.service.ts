import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class VideoPromptQueueService {
  constructor(
    @InjectQueue('video-prompt-queue') private entrypointQueue: Queue, // Inject the queue
  ) {}

  async addTimeJob() {
    // Add a recurring job that runs every 30 seconds
    await this.entrypointQueue.add(
      {}, // Payload (can be empty)
      {
        // repeat: { every: 30000 }, // Repeat every 30 seconds (30000 ms)
      },
    );
  }
}
