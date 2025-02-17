import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as  bcrypt from 'bcryptjs'
import {  OtpDataDto, UserDto } from 'src/auth/auth.dto';
import { MailService } from 'src/mail/mail.service';

@Controller()
export class AuthController {

    constructor(
        private authService : AuthService,
        private mailService : MailService 
    ){}

    
    @Post('send-otp')
    async createUser(@Body() formData : UserDto){
        const password = await bcrypt.hash(formData.password,12);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password : _password , ...rest} = formData;
        const  data:UserDto  = {...rest ,password};
        //generating otp
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const response:any = await this.authService.createUser(data,otp);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(response.message){
            await this.mailService.sendUserOtp(rest.email,otp);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response ;
    }

    @Post('create-user')
       otpAuth(@Body() otpData:OtpDataDto){
       return this.authService.otpAuth(otpData);
    }
}
