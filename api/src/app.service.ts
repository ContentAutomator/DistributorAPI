import { VideoDetailsDto } from './dto';
// import Queue from 'bull';
import { OnModuleInit, Inject, Injectable } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { ClientKafka } from '@nestjs/microservices';

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

  // Nhận tin nhắn từ Kafka
  async handleMessage(
    job: {
      job_id: string;
      status: string;
      video_url: string;
      thumbnail_url: string;
      message: string;
      duration: number;
      resolution: string;
      format: string;
    },
    secret_key: string,
  ) {
    console.log('Received message from Kafka:', job);

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
    return {
      message: 'Video rendering job submitted successfully',
      job_id: '12345',
    };
  }
}
