import { Injectable } from '@nestjs/common';
// import { VideoDetailsDto } from './dto/video-details.dto';
import Queue from 'bull';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  renderVideo(videoDetails) {
    // Render the video based on the provided details
    return {
      message: 'Video rendering job submitted successfully',
      job_id: '12345',
    };
  }
}
