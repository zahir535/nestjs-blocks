import { PartialType } from '@nestjs/swagger';
import { CreateFirebaseMessagingDto } from './create-firebase-messaging.dto';

export class UpdateFirebaseMessagingDto extends PartialType(CreateFirebaseMessagingDto) {}
