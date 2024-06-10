import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';

export type User = any;

@Injectable()
export class FirebaseAdminService {
  private logger = new Logger(FirebaseAdminService.name);

  constructor(
    private configService: ConfigService<{
      project_id: string;
      private_key: string;
      client_email: string;
    }>,
  ) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: this.configService.get<string>('project_id'),
        privateKey: this.configService
          .get<string>('private_key')
          .replace(/\\n/g, '\n'),
        clientEmail: this.configService.get<string>('client_email'),
      }),
    });
  }

  async verifyToken(token: string): Promise<unknown | undefined> {
    return firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((decodedIdToken) => {
        return decodedIdToken;
      })
      .catch((error) => {
        this.logger.error(error);

        throw new Error('Firebase Admin: Token verification failed');
      });
  }
}
