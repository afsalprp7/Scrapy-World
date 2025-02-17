import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user/userSchema';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports :[
      MongooseModule.forFeature([
        {name : User.name ,  schema : UserSchema },
      ]),
    ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService
  ]
})
export class AuthModule {}
