/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as firebaseAdmin from 'firebase-admin';
import { app } from 'firebase-admin';
import { FCMClient } from '../../firebase-admin.factory';
import { FirebaseMessagingDto } from './dto/firebase-messaging.dto';
import { TopicMessage } from 'firebase-admin/messaging';

export type User = any;

@Injectable()
export class FirebaseAdminService {
  // m1 - fail
  // private logger = new Logger(FirebaseAdminService.name);
  // constructor(
  //   private configService: ConfigService<{
  //     project_id: string;
  //     private_key: string;
  //     client_email: string;
  //   }>,
  // ) {
  //   firebaseAdmin.initializeApp({
  //     credential: firebaseAdmin.credential.cert({
  //       projectId: this.configService.get<string>('project_id'),
  //       privateKey: this.configService
  //         .get<string>('private_key')
  //         .replace(/\\n/g, '\n'),
  //       clientEmail: this.configService.get<string>('client_email'),
  //     }),
  //   });
  // }

  // M2
  // #db: FirebaseFirestore.Firestore;
  // #collection: FirebaseFirestore.CollectionReference;

  // constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
  //   this.#db = firebaseApp.firestore();
  //   this.#collection = this.#db.collection('<collection_name>');
  // }

  // async verifyToken(token: string): Promise<unknown | undefined> {
  //   return firebaseAdmin
  //     .auth()
  //     .verifyIdToken(token)
  //     .then((decodedIdToken) => {
  //       return decodedIdToken;
  //     })
  //     .catch((error) => {
  //       this.logger.error(error);

  //       throw new Error('Firebase Admin: Token verification failed');
  //     });
  // }

  // M3
  constructor(
    @Inject('MESSAGING_CLIENT') private readonly fcmClient: FCMClient,
  ) {}

  async notifyConsentTopics(payload: FirebaseMessagingDto) {
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
