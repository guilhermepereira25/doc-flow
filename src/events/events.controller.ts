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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({
    status: 201,
    description: 'Create an event',
    type: Event,
  })
  @Profiles(Profile.Admin, Profile.Professor)
  @Post()
  async create(@Res() res: Response, @Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventsService.create(createEventDto);
      if (!event) {
        return res.status(409).json({ message: 'Event already exists' });
      }
      return res.status(201).json(event);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return all events' })
  @ApiResponse({
    status: 200,
    description: 'Return all events',
    schema: {
      example: {
        users: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'EVENT 1',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            name: 'EVENT 2',
          },
        ],
      },
    },
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const events = await this.eventsService.findAll();
      return res.status(200).json(events);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return an event' })
  @ApiResponse({
    status: 200,
    description: 'Return an event',
    type: Event,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Profiles(Profile.Admin, Profile.Professor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
