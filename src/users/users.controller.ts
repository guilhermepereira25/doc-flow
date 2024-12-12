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

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'The record created', type: User })
  @Profiles(Profile.Admin, Profile.Professor)
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      if (!user) {
        return res.status(409).json({ message: 'User already exists' });
      }
      return res.status(201).json(user);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof Error && err.message === 'Profile not found') {
        return res.status(400).json({ message: 'Invalid profile' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    schema: {
      example: {
        users: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            username: 'john_doe',
            profile_id: '550e8400-e29b-41d4-a716-446655440000',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            username: 'jane_doe',
            profile_id: '550e8400-e29b-41d4-a716-446655440001',
          },
        ],
      },
    },
  })
  @Get('page/:page')
  async findAll(@Res() res: Response, @Param('page') page: number) {
    try {
      page = page > 0 ? page : 1;
      const users = await this.usersService.findAll(page);
      return res.status(200).json({ users });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return a user' })
  @ApiResponse({
    status: 200,
    description: 'Return a user',
    type: User,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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
