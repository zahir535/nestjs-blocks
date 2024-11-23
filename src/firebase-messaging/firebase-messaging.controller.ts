/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FirebaseMessagingService } from './firebase-messaging.service';
import { CreateFirebaseMessagingDto } from './dto/create-firebase-messaging.dto';
import { UpdateFirebaseMessagingDto } from './dto/update-firebase-messaging.dto';
import { FirebaseMessagingDto } from './dto/firebase-messaging.dto';

@Controller('firebase-messaging')
export class FirebaseMessagingController {
  constructor(
    private readonly firebaseMessagingService: FirebaseMessagingService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  pushTopicMessage(@Body() topicPayload: FirebaseMessagingDto) {
    return this.firebaseMessagingService.pushATopicMessage(topicPayload);
  }

  // @Post()
  // create(@Body() createFirebaseMessagingDto: CreateFirebaseMessagingDto) {
  //   return this.firebaseMessagingService.create(createFirebaseMessagingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.firebaseMessagingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.firebaseMessagingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFirebaseMessagingDto: UpdateFirebaseMessagingDto,
  // ) {
  //   return this.firebaseMessagingService.update(
  //     +id,
  //     updateFirebaseMessagingDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.firebaseMessagingService.remove(+id);
  // }
}
