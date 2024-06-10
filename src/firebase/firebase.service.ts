import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: FirebaseApp;
  private auth: Auth;

  onModuleInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
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
    );
  }
}
