import { Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/jwt.guard";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post('updateProfileImage')
  async updateProfileImage(){
   return await this.userService.updateProfileImage()
  }
}
