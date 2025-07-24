import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "src/entities/user/userSchema";
import { OtpDataDto, UserDto } from "src/modules/auth/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { loginData } from "src/types/authTypes";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(formData: UserDto, otp: string): Promise<object | string> {
    const createdUserModel = new this.userModel(formData);
    const userExists = await createdUserModel.collection.findOne({
      email: formData.email
    });
    if (userExists) {
      throw new ConflictException("User Already Exists Please Login");
    }
    createdUserModel.otp = otp;
    const user = await createdUserModel.save();
    return { userId: user._id, message: "User created successfully" };
  }

  //otp authentication and create user
  async otpAuth(otpData: OtpDataDto, res: Response) {
    const { sendingData, formattedUserOtp } = otpData;
    const user = await this.userModel.findOne({ _id: sendingData.userId });
    if (user?.otp === formattedUserOtp) {
      user.otp = "";
      user.emailVerified = true;
      await user.save();
      const { accessToken, refreshToken } = this.generateAccessToken(
        sendingData.userId,
        user.email
      );

      //accessToken for 1 hour
      res.cookie('accessToken' , accessToken , {
        httpOnly:true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : "strict",
        maxAge : 60 * 60 * 1000
      });

      //setting refresh token for 7 days
      res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
      });
      const {password , ...responseData} = user
      return res.status(200).json({message :"OTP verified successfully" , responseData})
    } else {
      throw new UnauthorizedException("Invalid OTP");
    }
  }

  //genrate access token
  generateAccessToken(userId: mongoose.Types.ObjectId, email: string) {
    const payload = { userId, email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });

    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }

  //User Login service
  async userLogin({ email, password }: loginData, res: Response) {
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      const comparePassword: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (comparePassword) {
        const userId = user._id;
        const {accessToken , refreshToken} = this.generateAccessToken(userId, email);
        res.cookie('accessToken' , accessToken , {
        httpOnly:true,
        secure : process.env.NODE_ENV === 'production' ,
        sameSite : "strict",
        maxAge : 60 * 60 * 1000
      });
      res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure : process.env.NODE_ENV === 'production' ,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
      });
        return res.status(200).json({ message: "Login Success",user });
      } else {
        throw new UnauthorizedException("Password Incorrect");
      }
    } else {
      throw new UnprocessableEntityException("User not Found Please Signup");
    }
  }
}
