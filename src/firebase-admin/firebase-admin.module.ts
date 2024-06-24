import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { ConfigModule } from '@nestjs/config';
import firebaseAdminConfig from '../config/firebaseAdminConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseAdminConfig],
    }),
  ],
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {}
