import { Module } from '@nestjs/common';
import { FirebaseAuthController } from './firebase-auth.controller';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [FirebaseAuthController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
  imports: [FirebaseModule],
})
export class FirebaseAuthModule {}
