import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

interface JwtPayload {
  sub: string;
  email: string;
  // Add more fields if needed
}

// Extend Express Request to include user
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Helper to get typed request
function getTypedRequest(context: ExecutionContext): AuthenticatedRequest {
  return context.switchToHttp().getRequest();
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = getTypedRequest(context);

    const token = request.cookies?.accessToken as string | undefined;
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
