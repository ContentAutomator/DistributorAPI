import { Test, TestingModule } from '@nestjs/testing';
import { VideoPromptQueueService } from './video-prompt-queue.service';

describe('VideoPromptQueueService', () => {
  let service: VideoPromptQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoPromptQueueService],
    }).compile();

    service = module.get<VideoPromptQueueService>(VideoPromptQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
