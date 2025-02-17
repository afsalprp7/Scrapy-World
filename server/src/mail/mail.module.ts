import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[  
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport : {
        host : process.env.MAIL_HOST,
        port : 465,
        secure : true,
        auth:{
          user : process.env.USER_MAIL,
          pass : process.env.PASSWORD
        }
      },
      defaults : {
        from : "Scrapy World"
      }
    })
  ],
  providers: [MailService]
})
export class MailModule {}
