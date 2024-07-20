import { BadRequestException, Injectable } from '@nestjs/common';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { Message, Messaging, getMessaging } from 'firebase-admin/messaging';

export const fcmAdminFactory = async () => {
  try {
    await applicationDefault()
      .getAccessToken()
      .catch((err) => {
        console.error('<<<<<<<<<<<<<<< FCM SETUP ERROR >>>>>>>>>>>>>>>>');
        console.error('GOOGLE_APPLICATION_CREDENTIAL env is not set!');
        console.error(
          'GOOGLE_APPLICATION_CREDENTIAL env value should point to a credentials-service.json filepath.',
        );
        console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        throw err;
      });

    const firebaseAdmin = initializeApp({
      credential: applicationDefault(),
    });

    const fcmClient = new FCMClient(getMessaging(firebaseAdmin));
    return fcmClient;
  } catch (error) {
    console.error('Error initializing the FCM app');
  }
};

@Injectable()
export class FCMClient {
  client: Messaging;
  constructor(fcmClient: Messaging) {
    this.client = fcmClient;
  }

  async pushNotify(message: Message) {
    const successResponse = this.client
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log(`Successfully sent message: '${response}'`);
        return `Successfully sent message: '${response}'`;
      })
      .catch((error) => {
        console.log('Error sending message:', error);
        throw new BadRequestException(error);
      });

    return successResponse;
  }
}
