/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import firebaseAdminConfig from '../config/firebaseAdminConfig';
import * as admin from 'firebase-admin';
import { fcmAdminFactory } from '../../firebase-admin.factory';

// const firebaseProvider = {
//   provide: 'FIREBASE_APP',
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => {
//     // const firebaseConfig = {
//     //   type: configService.get<string>('TYPE'),
//     //   project_id: configService.get<string>('PROJECT_ID'),
//     //   private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
//     //   private_key: configService.get<string>('PRIVATE_KEY'),
//     //   client_email: configService.get<string>('CLIENT_EMAIL'),
//     //   client_id: configService.get<string>('CLIENT_ID'),
//     //   auth_uri: configService.get<string>('AUTH_URI'),
//     //   token_uri: configService.get<string>('TOKEN_URI'),
//     //   auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
//     //   client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
//     //   universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
//     // } as admin.ServiceAccount;

//     // return admin.initializeApp({
//     //   credential: admin.credential.cert(firebaseConfig),
//     //   databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
//     //   storageBucket: `${firebaseConfig.projectId}.appspot.com`,
//     // });

//     return admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: configService.get<string>('project_id'),
//         privateKey: configService
//           .get<string>('private_key')
//           .replace(/\\n/g, '\n'),
//         clientEmail: configService.get<string>('client_email'),
//       }),
//     });
//   },
// };

@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseAdminService,
    {
      provide: 'MESSAGING_CLIENT',
      useFactory: fcmAdminFactory,
    },
  ],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {}
