import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignUpAuthDto } from './dto/singup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async authenticate(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isPasswordMatching = await compare(password, user.password);
    if (!isPasswordMatching) {
      return null;
    }
    return user;
  }

  private async generateJwtPayloadAndGetAccessToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      profile: user.profile,
      profile_roles: user.profile?.roles,
    };
    return await this.jwtService.signAsync(payload);
  }

  private async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async signIn(signInDto: SignInAuthDto): Promise<{ access_token: string }> {
    const authenticateUser = await this.authenticate(
      signInDto.username,
      signInDto.password,
    );
    if (!authenticateUser) {
      return null;
    }
    const accessToken =
      await this.generateJwtPayloadAndGetAccessToken(authenticateUser);
    return {
      access_token: accessToken,
    };
  }

  async signUp(signupDto: SignUpAuthDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(signupDto.username);
    if (user) {
      return null;
    }
    const hashedPassword = await this.hashPassword(signupDto.password);
    const newUser = await this.usersService.create({
      username: signupDto.username,
      password: hashedPassword,
    });
    const accessToken = await this.generateJwtPayloadAndGetAccessToken(newUser);
    return {
      access_token: accessToken,
    };
  }
}
