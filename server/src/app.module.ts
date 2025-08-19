import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    MongooseModule.forRoot(process.env.MONGODB_URL as string),
    AuthModule,
    MailModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
