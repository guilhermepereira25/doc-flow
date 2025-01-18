import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Profiles } from 'src/profile/decorators/profile.decorator';
import { Profile } from 'src/profile/enum/profile.enum';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './entities/event.entity';
import { GetAllEventsResponseDto } from './dto/get-all-events-response.dto';
import { GetEventResponseDto } from './dto/get-event-response.dto';
import { EndEventResponseDto } from './dto/end-event-response.dto';
import { ApiResponse as ApiResponseInstance } from '../lib/api-response';

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
      return res.status(201).json(
        new ApiResponseInstance({
          status: 201,
          success: true,
          data: event,
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof ConflictException) {
        return res.status(409).json(
          new ApiResponseInstance({
            status: 409,
            success: false,
            data: null,
            error: err.message,
          }),
        );
      }
      if (err instanceof BadRequestException) {
        return res.status(400).json(
          new ApiResponseInstance({
            status: 400,
            success: false,
            data: null,
            error: 'Invalid data',
          }),
        );
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Return all events' })
  @ApiResponse({
    status: 200,
    description: 'Return all events',
    type: GetAllEventsResponseDto,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const events = await this.eventsService.findAll();
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: events,
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Return an event' })
  @ApiResponse({
    status: 200,
    description: 'Return an event',
    type: GetEventResponseDto,
  })
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const [event, isStarted, isEnded] = await this.eventsService.findOne(id);
      if (!event) {
        return res.status(404).json(
          new ApiResponseInstance({
            status: 404,
            success: false,
            data: null,
            error: 'Event not found',
          }),
        );
      }
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: { event, isStarted, isEnded },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
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

  @ApiOperation({ summary: 'End an event' })
  @ApiResponse({
    status: 200,
    description: 'End an event',
    type: EndEventResponseDto,
  })
  @Post('end/:id')
  async endEvent(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.eventsService.endEvent(id);
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: {
            message: 'Event ended',
          },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }
}
