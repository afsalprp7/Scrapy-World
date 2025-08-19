import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcryptjs";
import { OtpDataDto, UserDto } from "src/modules/auth/auth.dto";
import { MailService } from "src/modules/mail/mail.service";
import { Response, Request } from "express";
import { loginData } from "src/types/authTypes";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {}

  @Post("send-otp")
  async createUser(@Body() formData: UserDto) {
    try {
      const password = await bcrypt.hash(formData.password, 12);
      const { password: _password, ...rest } = formData;
      const data: UserDto = { ...rest, password };
      //generating otp
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const response: any = await this.authService.createUser(data, otp);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.message) {
        await this.mailService.sendUserOtp(rest.email, otp);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post("create-user")
  otpAuth(@Body() otpData: OtpDataDto, @Res() res: Response) {
    try {
      return this.authService.otpAuth(otpData, res);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post("login")
  userLogin(@Body() userData: loginData, @Res() res: Response) {
    try {
      return this.authService.userLogin(userData, res);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //verifying the token
  @Get("userCheck")
  userValidCheck(@Req() req: Request) {
    try {
      const accessToken = req.cookies?.accessToken as string;
      return this.authService.userValidCheck(accessToken);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get("refreshToken")
  refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken as string;
      console.log(refreshToken);
      if (refreshToken) {
        return this.authService.refreshToken(refreshToken, res);
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get("logout")
  userLogout(@Res() res: Response) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).send({ message: "Logout successfull" });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
