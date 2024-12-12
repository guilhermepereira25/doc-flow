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
import { PresencesService } from './presences.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Response } from 'express';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';

@Controller('presences')
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) {}

  @Profiles(Profile.Student)
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPresenceDto: CreatePresenceDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const userId: string = req.user?.sub;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const presence = await this.presencesService.create(
        userId,
        createPresenceDto,
      );
      if (!presence) {
        return res.status(409).json({ message: 'Presence already exists' });
      }
      return res.status(201).json(presence);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const presences = await this.presencesService.findAll();
      return res.status(200).json(presences);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const presence = await this.presencesService.findOne(id);
      if (!presence) {
        return res.status(404).json({ message: 'Presence not found' });
      }
      return res.status(200).json(presence);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePresenceDto: UpdatePresenceDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPresence = await this.presencesService.update(
        id,
        updatePresenceDto,
      );
      if (!updatedPresence) {
        return res.status(404).json({ message: 'Presence not found' });
      }
      return res.status(200).json(updatedPresence);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.presencesService.remove(id);
      return res.status(200).json({ message: 'Presence removed successfully' });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('event/:id')
  async findAllByEvent(@Param('id') id: string, @Res() res: Response) {
    try {
      const presences = await this.presencesService.findAllByEvent(id);
      return res.status(200).json(presences);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('user/:id')
  async findAllByUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const presences = await this.presencesService.findAllByUser(id);
      return res.status(200).json(presences);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
