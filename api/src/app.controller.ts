import {
  Controller, 
  Get,
  Body,
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
  getHello(): string {
    return this.appService.getHello();
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

