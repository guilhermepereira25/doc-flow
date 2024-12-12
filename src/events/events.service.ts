import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './repositories/event.repository.interface';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<null | Event> {
    const [event, created] = await this.eventRepository.findOrCreateEvent(
      createEventDto.name,
    );
    if (created) {
      return null;
    }
    return event;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.findAll();
  }

  async findOne(id: string): Promise<Event | null> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      return null;
    }
    return event;
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string): Promise<void> {
    return await this.eventRepository.remove(id);
  }
}
