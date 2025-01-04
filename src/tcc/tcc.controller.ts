import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { TccService } from './tcc.service';
import { CreateTccDto } from './dto/create-tcc.dto';
import { UpdateTccDto } from './dto/update-tcc.dto';
import { Response } from 'express';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';
import { UserRequest } from 'src';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tcc')
export class TccController {
  constructor(private readonly tccService: TccService) {}

  @ApiOperation({ summary: 'Create a new TCC' })
  @ApiResponse({
    status: 201,
    description: 'Create a new TCC',
    type: CreateTccDto,
  })
  @Profiles(Profile.Admin, Profile.Professor)
  @Post()
  async create(
    @Req() req: UserRequest,
    @Res() res: Response,
    @Body() createTccDto: CreateTccDto,
  ) {
    try {
      createTccDto.advisorId = req.user?.sub;
      const newTcc = await this.tccService.create(createTccDto);

      return res.status(201).json(newTcc);
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const tccData = await this.tccService.findAll();
      return res.status(200).json(tccData);
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const tcc = await this.tccService.findOne(id);
      return res.status(200).json(tcc);
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTccDto: UpdateTccDto,
  ) {
    try {
      const updatedTcc = await this.tccService.update(id, updateTccDto);
      return res.status(200).json(updatedTcc);
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.tccService.remove(id);
      return res.status(204).send();
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
