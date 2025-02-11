import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as  bcrypt from 'bcryptjs'
import { UserDto } from 'src/types/auth.dto';

@Controller()
export class AuthController {
    constructor(private authService : AuthService ){}

    @Post('signup')
    async createUser(@Body() formData : UserDto){
        const password = await bcrypt.hash(formData.password,12);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password : _password , ...rest} = formData ;
        const  data:UserDto  = {...rest ,password} ;
        return this.authService.createUser(data) ;
    }
}
