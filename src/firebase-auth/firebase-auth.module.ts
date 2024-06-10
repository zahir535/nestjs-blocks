import { Module } from '@nestjs/common';
import { FirebaseAuthController } from './firebase-auth.controller';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  controllers: [FirebaseAuthController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
