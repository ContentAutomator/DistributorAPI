import {
  Controller, 
  Get,
  Body,
  Header,
  Options,
  Post 
} from '@nestjs/common';
import { AppService } from './app.service';

import { 
  VideoDetailsDto,
} from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Options()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header('Access-Control-Max-Age', '3600')
  @Header('Content-Type', 'application/json')
  options() {
    return 'OK';
  }
  // 
  @Post()
  @Header('Content-Type', 'application/json')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  @Header('Access-Control-Allow-Methods', 'POST')
  notifyWhenJobComplete(@Body() videoDetails: VideoDetailsDto) {
    console.log('Received message:', videoDetails);
    let secret_key = videoDetails.secret_key;
    this.appService.handleMessage(videoDetails, secret_key);

    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Options('/api/v1/render-video')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header('Access-Control-Max-Age', '3600')
  @Header('Content-Type', 'application/json')
  optionsRenderVideo() {
    return 'OK';
  }
  @Post('/api/v1/render-video')
  @Header('Content-Type', 'application/json')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  @Header('Access-Control-Allow-Methods', 'POST')
  renderVideo(@Body() videoDetails: VideoDetailsDto) {
    console.log('Received video details:', videoDetails);
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

