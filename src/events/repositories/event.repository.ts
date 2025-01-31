import { InjectModel } from '@nestjs/sequelize';
import { EventRepository } from './event.repository.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { EventStatus } from '../enum/event-status.enum';
import { Op } from 'sequelize';

export class EventRepositoryImpl implements EventRepository {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventModel.scope('withoutTimestamps').create({
      name: createEventDto.name,
      start_at: createEventDto.eventStartDate,
      end_at: createEventDto.eventEndDate,
      status: createEventDto.status,
      created_by_user_id: createEventDto.created_by_user_id,
    });
  }

  async findAll(offset: number, limit: number): Promise<Event[]> {
    return await this.eventModel.scope('withoutTimestamps').findAll({
      offset,
      limit,
    });
  }

  async findOne(id: string): Promise<Event> {
    return await this.eventModel.findByPk(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    return await event.update(updateEventDto);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    await event.destroy();
  }

  async findEventByName(name: string): Promise<Event> {
    return this.eventModel.findOne({ where: { name } });
  }

  async findOrCreateEvent(name: string): Promise<[Event, boolean]> {
    return await this.eventModel.findOrCreate({
      where: {
        name,
      },
    });
  }

  async endEvent(id: string): Promise<Event | null> {
    const event = await this.findOne(id);
    if (!event) {
      return null;
    }
    return await event.update({
      end_at: new Date(),
      status: EventStatus.STATUS_ENDED,
    });
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await this.eventModel.scope('withoutTimestamps').findAll({
      where: {
        status: EventStatus.STATUS_UPCOMING,
        start_at: {
          [Op.lte]: new Date(),
        },
        end_at: {
          [Op.eq]: null,
        },
      },
    });
  }

  async getEndedEvents(): Promise<Event[]> {
    return await this.eventModel.scope('withoutTimestamps').findAll({
      where: {
        status: EventStatus.STATUS_STARTED,
        end_at: {
          [Op.lte]: new Date(),
        },
      },
    });
  }
}
