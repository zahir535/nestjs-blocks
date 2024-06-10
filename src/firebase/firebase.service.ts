import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private logger = new Logger(FirebaseService.name);

  private app: FirebaseApp;

  constructor(
    private configService: ConfigService<{
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    }>,
  ) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    this.app = initializeApp({
      apiKey: 'AIzaSyDtghayQAbs6b7_f7nusrXFvjjy864o-O8',
      authDomain: 'nestjs-blocks.firebaseapp.com',
      projectId: 'nestjs-blocks',
      storageBucket: 'nestjs-blocks.appspot.com',
      messagingSenderId: '868520759199',
      appId: '1:868520759199:web:7000113439d82ad2feb7aa',
      measurementId: 'G-QG497V0XVN',
    });
  }

  getAppInstance(): FirebaseApp {
    return this.app;
  }

  getAuthInstance(app: FirebaseApp): Auth {
    return getAuth(app);
  }

  async registerUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.getAuthInstance(this.getAppInstance()),
      email,
      password,
    ).catch((error) => {
      this.logger.error(error);

      throw new Error('Firebase: Create user failed');
    });
  }

  async loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.getAuthInstance(this.getAppInstance()),
      email,
      password,
    ).catch((error) => {
      this.logger.error(error);

      throw new Error('Firebase: Login user failed');
    });
  }
}
