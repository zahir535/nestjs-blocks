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
  private auth: Auth;

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
      apiKey: this.configService.get<string>('apiKey'),
      authDomain: this.configService.get<string>('authDomain'),
      projectId: this.configService.get<string>('projectId'),
      storageBucket: this.configService.get<string>('storageBucket'),
      messagingSenderId: this.configService.get<string>('messagingSenderId'),
      appId: this.configService.get<string>('appId'),
      measurementId: this.configService.get<string>('measurementId'),
    });
    this.auth = getAuth(this.getAppInstance());
  }

  getAppInstance(): FirebaseApp {
    return this.app;
  }

  getAuthInstance(): Auth {
    return this.auth;
  }

  async registerUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.getAuthInstance(),
      email,
      password,
    ).catch((error) => {
      this.logger.error(error);

      throw new Error('Firebase: Create user failed');
    });
  }

  async loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.getAuthInstance(),
      email,
      password,
    ).catch((error) => {
      this.logger.error(error);

      throw new Error('Firebase: Login user failed');
    });
  }
}
