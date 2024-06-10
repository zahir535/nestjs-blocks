import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

export type User = any;

const firebaseParams = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: firebaseParams.project_id,
        privateKey: firebaseParams.private_key.replace(/\\n/g, '\n'),
        clientEmail: firebaseParams.client_email,
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

        throw new Error('Token verification failed');
      });
  }
}
