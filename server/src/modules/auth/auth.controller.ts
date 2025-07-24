import { Body, Controller, Post, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcryptjs";
import { OtpDataDto, UserDto } from "src/modules/auth/auth.dto";
import { MailService } from "src/modules/mail/mail.service";
import { Response } from "express";
import { loginData } from "src/types/authTypes";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {}

  @Post("send-otp")
  async createUser(@Body() formData: UserDto) {
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
  }

  @Post("create-user")
  otpAuth(@Body() otpData: OtpDataDto, @Res() res: Response) {
    return this.authService.otpAuth(otpData, res);
  }

  @Post("login")
  userLogin(@Body() userData: loginData, @Res() res: Response) {
    return this.authService.userLogin(userData, res);
  }

  @Get("logout")
  userLogout(@Res() res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).send({ message: "Logout successfull" });
  }
}
