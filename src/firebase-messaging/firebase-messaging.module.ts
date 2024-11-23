import { Module } from '@nestjs/common';
import { FirebaseMessagingService } from './firebase-messaging.service';
import { FirebaseMessagingController } from './firebase-messaging.controller';
import { fcmAdminFactory } from '../../firebase-admin.factory';

@Module({
  controllers: [FirebaseMessagingController],
  providers: [
    FirebaseMessagingService,
    {
      provide: 'MESSAGING_CLIENT',
      useFactory: fcmAdminFactory,
    },
  ],
})
export class FirebaseMessagingModule {}
