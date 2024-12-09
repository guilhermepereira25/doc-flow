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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Response } from 'express';
import { Profiles } from './decorators/profile.decorator';
import { Profile } from './enum/profile.enum';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Profiles(Profile.Admin)
  @Post()
  async create(
    @Res() res: Response,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    try {
      const profile = await this.profileService.create(createProfileDto);
      if (!profile) {
        return res.status(409).json({ message: 'Profile already exists' });
      }
      return res.status(201).json(profile);
    } catch (error) {
      if (process.env.APP_ENV === 'development') {
        console.error(error);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const profiles = await this.profileService.findAll();
      return res.status(200).json(profiles);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Profiles(Profile.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Profiles(Profile.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
