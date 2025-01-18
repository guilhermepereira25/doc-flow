import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { ApiResponse as ApiResponseInstance } from 'src/lib/api-response';
import { GetAllUsersResponseDto } from './dto/get-all-users-response.dto';
import { Api500ResponseDto } from 'src/lib/dto/api-500-response.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: Api500ResponseDto,
  })
  @Profiles(Profile.Admin, Profile.Professor)
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const userCreateResult = await this.usersService.create(createUserDto);
      if (!userCreateResult) {
        return res.status(409).json({ message: 'User already exists' });
      }
      return res.status(201).json(
        new ApiResponseInstance<{ user: User }>({
          ...userCreateResult,
          status: 201,
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof Error && err.message === 'Profile not found') {
        return res.status(400).json(
          new ApiResponseInstance<null>({
            status: 400,
            error: 'Profile not found',
            data: null,
            success: false,
          }),
        );
      }
      return res.status(500).json(
        new ApiResponseInstance<null>({
          status: 500,
          error: 'Internal server error',
          data: null,
          success: false,
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Return all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: GetAllUsersResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: Api500ResponseDto,
  })
  @Get('page/:page')
  async findAll(@Res() res: Response, @Param('page') page: number) {
    try {
      page = page > 0 ? page : 1;
      const findAllUserResult = await this.usersService.findAll(page);
      return res.status(200).send(
        new ApiResponseInstance<{ users: User[] }>({
          ...findAllUserResult,
          status: 200,
          error: null,
        }).toJson(),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).send(
        new ApiResponseInstance<null>({
          status: 500,
          error: 'Internal server error',
          data: null,
          success: false,
        }).toJson(),
      );
    }
  }

  @ApiOperation({ summary: 'Return a user' })
  @ApiResponse({
    status: 200,
    description: 'Return a user',
    type: User,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: Api500ResponseDto,
  })
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const findUserResult = await this.usersService.findOne(id);
      const response = new ApiResponseInstance<{ user: User }>({
        status: 200,
        error: null,
        ...findUserResult,
      });
      return res.status(200).json(response.toJson());
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance<null>({
          status: 500,
          error: 'Internal server error',
          data: null,
          success: false,
        }).toJson(),
      );
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
