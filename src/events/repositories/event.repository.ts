import { InjectModel } from '@nestjs/sequelize';
import { EventRepository } from './event.repository.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

export class EventRepositoryImpl implements EventRepository {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventModel.create({
      ...createEventDto,
    });
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.findAll();
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
}
