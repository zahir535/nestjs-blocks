import { Module } from '@nestjs/common';
import { FirebaseUsersService } from './firebase-users.service';

@Module({
  providers: [FirebaseUsersService]
})
export class FirebaseUsersModule {}
