import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Response } from 'express';
import { SignUpAuthDto } from './dto/singup-auth.dto';
import { Public } from './decorators/public-auth.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Sign in',
    schema: {
      example: {
        accessToken: 'token',
      },
    },
  })
  @Public()
  @Post('signin')
  async signIn(@Res() res: Response, @Body() signinDto: SignInAuthDto) {
    try {
      const accessToken = await this.authService.signIn(signinDto);
      if (!accessToken) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json(accessToken);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiResponse({
    status: 201,
    description: 'Sign up',
    schema: {
      example: {
        accessToken: 'token',
      },
    },
  })
  @Public()
  @Post('signup')
  async signUp(@Res() res: Response, @Body() signupDto: SignUpAuthDto) {
    try {
      const accessToken = await this.authService.signUp(signupDto);
      if (!accessToken) {
        return res.status(400).json({ message: 'User already exists' });
      }
      return res.status(201).json(accessToken);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
