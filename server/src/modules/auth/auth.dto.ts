/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class UserDto{

    @IsNotEmpty()
    firstname! : string;

    @IsNotEmpty()
    lastname! : string ;

    @IsEmail()
    email! : string;

    @IsNotEmpty()
    phone! : string;

    @IsNotEmpty()
    password! : string;

    @IsNotEmpty()
    otp? : string | null ;

    @IsNotEmpty()
    emailVerified : boolean;

    @IsNotEmpty()
    _id : string  ;
}

export class OtpDataDto{
    @IsNotEmpty()
    formattedUserOtp : string;

    @IsNotEmpty()
    sendingData : {
        userId : mongoose.Types.ObjectId,
        message : string
    } ;
}
