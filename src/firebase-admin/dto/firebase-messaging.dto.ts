/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum enumExample {
  example1 = 'example1',
  example2 = 'example2',
}

export class FirebaseMessagingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsEnum(enumExample)
  @IsNotEmpty()
  exampleEnum: enumExample;
}
