import { Injectable } from '@nestjs/common';
import { VideoDetailsDto } from './dto';
import Queue from 'bull';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  renderVideo(videoDetails: VideoDetailsDto): { message: string; job_id: string } {
    return {
      message: 'Video rendering job submitted successfully',
      job_id: '12345',
    };
  }
}
