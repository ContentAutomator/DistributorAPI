import { VideoDetailsDto } from './dto';
// import Queue from 'bull';
import { join } from 'path';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { OnModuleInit, Inject, Injectable } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
// import { ClientKafka } from '@nestjs/microservices';

const videoDetailsDir = '/video-details/notifications/';
if (!existsSync(videoDetailsDir)) {
  console.log('Creating directory:', videoDetailsDir);
  mkdirSync(videoDetailsDir, { recursive: true });
}
@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    // @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly appGateway: AppGateway,
  ) {}

  async onModuleInit() {
    // Subscribe tới các topic từ Kafka
    // this.kafkaClient.subscribeToResponseOf('notification-topic');
    console.log('Subscribed to notification-topic');
    // await this.kafkaClient.connect();
    console.log('Connected to Kafka');
    // KafkaJS v2.0.0 switched default partitioner.
    // To retain the same partitioning behavior as in previous versions, create the producer with the option "createPartitioner: Partitioners.LegacyPartitioner".
    // See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details.
    // Silence this warning by setting the environment variable "KAFKAJS_NO_PARTITIONER_WARNING=1" {"timestamp":"2024-10-03T14:02:37.281Z","logger":"kafkajs"}
  }
  djb2(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  }
  getCacheFilePath(prompt: string): string {
    let videoDetailsFile = `./video-details-${this.djb2(prompt)}.json`;
    return join(videoDetailsDir, videoDetailsFile);
  }
  readCache(job: VideoDetailsDto) {
    let videoDetailsFilePath = this.getCacheFilePath(job.prompt);
    if (existsSync(videoDetailsFilePath)) {
      console.log('Reading cache:', videoDetailsFilePath);
      let videoDetails = JSON.parse(readFileSync(videoDetailsFilePath, 'utf8'));
      return videoDetails;
    }
    return null;
  }
  checkCache(job: VideoDetailsDto): boolean {
    let videoDetails = this.readCache(job);
    console.log('Checking cache:', videoDetails);
    if (videoDetails) {
      if (videoDetails.completed === true) {
        console.log('Job already completed');
        return true;
      }
    }
    return false;
  }

  // Nhận tin nhắn từ Kafka
  async handleMessage(
    job: VideoDetailsDto,
    secret_key: string,
  ) {
    // 
    let videoDetailsFilePath = this.getCacheFilePath(job.prompt);
    let parsed: any;
    if (existsSync(videoDetailsFilePath)) {
      parsed = JSON.parse(readFileSync(videoDetailsFilePath, 'utf8'));
    }else{
      parsed = { notifications: [], started: Date.now() };
    }
    let notifications = parsed.notifications;
    let started = parsed.started;
    notifications.push({
      message: job,
      time: Date.now() - started,
    });
    writeFileSync(videoDetailsFilePath, JSON.stringify({
      completed: job.status === 'completed',
      started: started,
      notifications: notifications,
    }, null, 2));
    // 
    // console.log('Received message from Kafka:', job);

    // Gửi thông báo tới tất cả client qua WebSocket
    this.appGateway.notifyWhenJobComplete(job, secret_key);
  }
  getHello(): string {
    return 'Hello World!';
  }

  renderVideo(videoDetails: VideoDetailsDto): {
    message: string;
    job_id: string;
  } {
    if (this.checkCache(videoDetails)) {
      let secret_key = videoDetails.secret_key;
      let cached = this.readCache(videoDetails);
      let notifications = cached.notifications;
      for (let notification of notifications) {
        let time = notification.time;
        setTimeout(() => {
          this.appGateway.sendNotification(
            notification.message,
            secret_key,
            'job_complete'
          );
        }, Math.round(time / 3));
      }
      return {
        message: 'Video rendering job already completed',
        job_id: '12345',
      }
    }
    let videoDetailsFilePath = this.getCacheFilePath(videoDetails.prompt);
    writeFileSync(videoDetailsFilePath, JSON.stringify({
      completed: false,
      started: Date.now(),
      notifications: [],
    }, null, 2));
    console.log('Received video details:', videoDetails);
    let prompt = videoDetails.prompt;
    let secret_key = videoDetails.secret_key;
    this.appGateway.sendNotification(
      'Received video rendering request. Prompt: ' + prompt,
      secret_key,
    );
    return {
      message: 'Video rendering job submitted successfully',
      job_id: '12345',
    };
  }
}
