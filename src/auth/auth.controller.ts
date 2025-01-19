import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Response } from 'express';
import { SignUpAuthDto } from './dto/singup-auth.dto';
import { Public } from './decorators/public-auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response-dto';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: ApiResponseDto,
  })
  @Public()
  @Post('signin')
  async signIn(@Res() res: Response, @Body() signinDto: SignInAuthDto) {
    try {
      const accessToken = await this.authService.signIn(signinDto);
      if (!accessToken) {
        return res
          .status(401)
          .json(new ApiResponseDto(401, false, null, 'Invalid credentials'));
      }
      return res.status(200).json({ accessToken });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res
        .status(500)
        .json(
          new ApiResponseDto<null>(500, false, null, 'Internal server error'),
        );
    }
  }

  @ApiResponse({
    status: 201,
    description: 'Sign up',
    type: AuthResponseDto,
  })
  @Public()
  @Post('signup')
  async signUp(@Res() res: Response, @Body() signupDto: SignUpAuthDto) {
    try {
      const accessToken = await this.authService.signUp(signupDto);
      if (!accessToken) {
        return res
          .status(400)
          .json(new ApiResponseDto(400, false, null, 'User already exists'));
      }
      return res.status(201).json(
        new ApiResponseDto(
          201,
          true,
          {
            accessToken,
          },
          null,
        ),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res
        .status(500)
        .json(
          new ApiResponseDto<null>(500, false, null, 'Internal server error'),
        );
    }
  }
}
