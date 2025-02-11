/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from "class-validator";

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
}