import {
  Controller, 
  Get,
  Body,
  Header,
  Post 
} from '@nestjs/common';
import { AppService } from './app.service';

import { 
  VideoDetailsDto,
} from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getHello(): string {
    this.appService.handleMessage({
      'job_id': '12345',
      'status': 'complete',
      'video_url': 'https://example.com/video.mp4',
      'thumbnail_url': 'https://example.com/thumbnail.jpg',
      'message': 'Video rendering job complete',
      'duration': 60,
      'resolution': '1080p',
      'format': 'mp4',
    }, 'YOUR_SECRET_KEY');

    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Post('/api/v1/render-video')
  renderVideo(@Body() videoDetails: VideoDetailsDto) {
    return this.appService.renderVideo(videoDetails);
  }
}

// Developers will send a POST request to your API with the details for the video rendering job, such as the prompt or instructions, video duration, and desired output format.

// API Endpoint:

// POST /api/v1/render-video

// Request Body:

// {
//   "prompt": "Create a video that shows a sunset over the mountains.",
//   "resolution": "1080p",
//   "duration": 60,
//   "format": "mp4",
//   "callback_url": "https://developer-app.com/webhook/complete"
// }
// Request Parameters:

// prompt: The text-based prompt or instructions for the video rendering.
// resolution: The desired resolution for the video (e.g., "1080p", "720p").
// duration: Length of the video in seconds.
// format: The output format of the video (e.g., "mp4", "avi").
// callback_url: Optional. A URL where your system will send an HTTP callback when rendering is complete (in addition to WebSocket notifications).

