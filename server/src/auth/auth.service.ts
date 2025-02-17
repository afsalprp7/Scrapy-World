import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/entities/user/userSchema";
import { OtpDataDto, UserDto } from "src/auth/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
) {}

  async createUser(formData: UserDto, otp:string): Promise<object | string> {
    const createdUserModel = new this.userModel(formData);
    const userExists = await createdUserModel.collection.findOne({
      email: formData.email
    });
    if (userExists) {
      throw new ConflictException('User Already Exists Please Login');
    }
    createdUserModel.otp = otp;
    const user = await createdUserModel.save();
    return {userId : user._id , message : 'User created successfully'};
  }

  async otpAuth(otpData: OtpDataDto) {
    const {sendingData , formattedUserOtp} = otpData ;

    const userModel   = this.userModel ;
    const user  = await userModel.findOne({ _id : sendingData.userId}) ;
    console.log(formattedUserOtp,user?.otp);

    if(user?.otp === formattedUserOtp.toString()) {
        user.otp = "" ;
        user.emailVerified = true ;
        await user.save() ;
        return 
    }else{
        throw new ConflictException("Invalid OTP");
    }
  }
}
