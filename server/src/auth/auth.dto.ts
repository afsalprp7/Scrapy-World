/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

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
    otp! : string | null ;

    @IsNotEmpty()
    emailVerified : boolean;
}

export class OtpDataDto{
    @IsNotEmpty()
    formattedUserOtp : string;

    @IsNotEmpty()
    sendingData : {
        userId : ObjectId,
        message : string
    } ;
}
