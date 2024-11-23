import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseMessagingController } from './firebase-messaging.controller';
import { FirebaseMessagingService } from './firebase-messaging.service';

describe('FirebaseMessagingController', () => {
  let controller: FirebaseMessagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseMessagingController],
      providers: [FirebaseMessagingService],
    }).compile();

    controller = module.get<FirebaseMessagingController>(
      FirebaseMessagingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
