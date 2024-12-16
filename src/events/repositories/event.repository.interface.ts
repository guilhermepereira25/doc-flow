import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

export interface EventRepository {
  create(createEventDto: CreateEventDto): Promise<Event>;
  findAll(): Promise<Event[]>;
  findOne(id: string): Promise<Event>;
  update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
  remove(id: string): Promise<void>;
  findEventByName(name: string): Promise<Event>;
  findOrCreateEvent(name: string): Promise<[Event, boolean]>;
  endEvent(id: string): Promise<null | Event>;
  getUpcomingEvents(): Promise<Event[]>;
  getEndedEvents(): Promise<Event[]>;
}
