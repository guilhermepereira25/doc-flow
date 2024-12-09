import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PROFILES_KEY } from './decorators/profile.decorator';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredProfiles = this.reflector.get<string[]>(
      PROFILES_KEY,
      context.getHandler(),
    );
    if (!requiredProfiles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    const hasProfile = requiredProfiles.some((profile: string) =>
      user.profile?.name.includes(profile),
    );
    if (!hasProfile) {
      throw new ForbiddenException();
    }
    return true;
  }
}
