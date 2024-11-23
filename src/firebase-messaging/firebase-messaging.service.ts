/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateFirebaseMessagingDto } from './dto/create-firebase-messaging.dto';
import { UpdateFirebaseMessagingDto } from './dto/update-firebase-messaging.dto';
import { FCMClient } from 'firebase-admin.factory';
import { TopicMessage } from 'firebase-admin/messaging';
import { FirebaseMessagingDto } from './dto/firebase-messaging.dto';

@Injectable()
export class FirebaseMessagingService {
  // initialize fcm class
  constructor(
    @Inject('MESSAGING_CLIENT') private readonly fcmClient: FCMClient,
  ) {}

  async pushATopicMessage(payload: FirebaseMessagingDto) {
    const message: TopicMessage = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: {
        exampleEnum: payload.exampleEnum,
      },
      topic: 'exampleTopic',
    };

    const successResponse = await this.fcmClient
      .pushNotify(message)
      .catch((err) => {
        // throw new RpcException(err);
        throw err;
      });

    return successResponse;
  }
}
