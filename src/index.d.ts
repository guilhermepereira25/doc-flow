import { Request } from 'express';
import { Profile } from './profile/entities/profile.entity';

export type UserJwtPayload = {
  sub: string;
  email: string;
  profile: Profile;
};

export type UserRequest = Request & { user: UserJwtPayload };
