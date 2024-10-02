To create an API that allows developers to send prompts for video rendering and receive notifications via WebSockets when the rendering is complete, we need to break down the workflow into two parts: 

1. **Sending a request for video rendering via the API**.
2. **Receiving a notification via WebSocket when rendering is complete**.

Let's design both the request-response format for the API and the WebSocket notification format.

### 1. **API Request for Video Rendering**
Developers will send a `POST` request to your API with the details for the video rendering job, such as the prompt or instructions, video duration, and desired output format.

#### **API Endpoint:** 
`POST /api/v1/render-video`

#### **Request Body:**
```json
{
  "prompt": "Create a video that shows a sunset over the mountains.",
  "resolution": "1080p",
  "duration": 60,
  "format": "mp4",
  "callback_url": "https://developer-app.com/webhook/complete"
}
```

#### **Request Parameters:**
- `prompt`: The text-based prompt or instructions for the video rendering.
- `resolution`: The desired resolution for the video (e.g., "1080p", "720p").
- `duration`: Length of the video in seconds.
- `format`: The output format of the video (e.g., "mp4", "avi").
- `callback_url`: Optional. A URL where your system will send an HTTP callback when rendering is complete (in addition to WebSocket notifications).

#### **Response Body:**
```json
{
  "job_id": "12345",
  "status": "queued",
  "message": "Your video rendering job has been queued.",
  "estimated_time": 120
}
```

#### **Response Parameters:**
- `job_id`: A unique ID for the video rendering job.
- `status`: The current status of the job (e.g., "queued").
- `message`: A message confirming that the job has been received.
- `estimated_time`: Estimated time (in seconds) for video rendering to complete.

### 2. **WebSocket Notification When Video Rendering is Complete**

The WebSocket is used to notify developers when their video rendering is complete. Once the job is done, the system sends a notification message through an open WebSocket connection.

#### **WebSocket URL:**
`wss://yourservice.com/notifications`

#### **WebSocket Connection:**
The developer opens a WebSocket connection using their API key for authentication.

```json
{
  "type": "subscribe",
  "api_key": "your-api-key-here"
}
```

#### **WebSocket Notification (When Job is Complete):**
Once the video rendering is complete, the server will send a message to the client through the WebSocket connection.

```json
{
  "type": "job_complete",
  "job_id": "12345",
  "status": "completed",
  "video_url": "https://yourservice.com/videos/12345.mp4",
  "thumbnail_url": "https://yourservice.com/thumbnails/12345.png",
  "message": "Your video has been successfully rendered and is available for download.",
  "duration": 60,
  "resolution": "1080p",
  "format": "mp4"
}
```

#### **Notification Parameters:**
- `type`: The type of notification (e.g., `job_complete`).
- `job_id`: The ID of the completed job.
- `status`: The final status of the job (e.g., `completed`).
- `video_url`: The URL where the rendered video can be downloaded.
- `thumbnail_url`: A URL for the thumbnail of the rendered video.
- `message`: A message confirming the completion of the job.
- `duration`: The duration of the video.
- `resolution`: The resolution of the rendered video.
- `format`: The format of the output file.

### 3. **Error Handling**

#### **API Error Response:**
If there is an error in submitting the video rendering request, the API would return an error response.

```json
{
  "error": "invalid_request",
  "message": "The resolution parameter is invalid. Please use '720p' or '1080p'."
}
```

#### **WebSocket Error Message:**
If there’s a problem with the job or if the WebSocket connection has issues, a notification will be sent.

```json
{
  "type": "error",
  "job_id": "12345",
  "status": "failed",
  "message": "There was an error rendering your video."
}
```

### **Workflow Overview:**

1. Developer submits a video rendering request via the API.
2. The API returns a `job_id` and job status.
3. The developer subscribes to WebSocket notifications for updates.
4. Once the video rendering is complete, the system sends a WebSocket notification (or optionally, a webhook) with the download link.

This setup ensures that the developer can both check the status and receive real-time updates when the video rendering process is finished.
