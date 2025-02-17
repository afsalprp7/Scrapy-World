import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailService:MailerService){}

    async sendUserOtp(email : string , otp: string ) : Promise<void>{
        await this.mailService.sendMail({
            to : email,
            subject :"Confirm Your Email",
            text : `Hello! Please Confirm your email using the otp`,
            html : `<h3>hello!</h3><p>Please confirm your email id using this otp <h2>${otp}</h2>`
        }) ;
    }
}
