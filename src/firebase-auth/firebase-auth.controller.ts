import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/userAuth.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('firebase-auth')
export class FirebaseAuthController {
  constructor(private firebaseService: FirebaseService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.firebaseService.registerUser(
      registerDto.email,
      registerDto.password,
    );
  }
}
