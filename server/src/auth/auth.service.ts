import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user/userSchema';
import { UserDto } from 'src/types/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async createUser(formData : UserDto): Promise<User> {

        const createdUser = new this.userModel(formData);
        return  await createdUser.save() ;
    }
}
