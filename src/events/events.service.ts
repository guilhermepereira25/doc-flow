import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './repositories/event.repository.interface';
import { Event } from './entities/event.entity';
import { EventStatus } from './enum/event-status.enum';

@Injectable()
export class EventsService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<null | Event> {
    const event = await this.eventRepository.findEventByName(
      createEventDto.name,
    );
    if (event) {
      throw new ConflictException('Event already exists');
    }

    const eventEndDate =
      createEventDto.eventEndDate !== undefined
        ? new Date(createEventDto.eventEndDate)
        : null;
    const now = new Date();
    if (eventEndDate !== null && !this.isValidEventEndDate(eventEndDate, now)) {
      throw new BadRequestException('Invalid event end date');
    }

    const eventStartDate = new Date(createEventDto.eventStartDate);
    if (createEventDto.status !== undefined) {
      const [result, message] = this.isValidEventStatusForEventDates(
        eventStartDate,
        eventEndDate,
        now,
        createEventDto.status,
      );
      if (!result && message !== null) {
        throw new BadRequestException(message);
      }
    }

    return await this.eventRepository.create({
      name: createEventDto.name,
      eventStartDate: eventStartDate.toISOString(),
      eventEndDate: eventEndDate?.toISOString() || null,
      status: createEventDto.status,
    });
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.findAll();
  }

  async findOne(id: string): Promise<[Event, boolean, boolean] | null> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      return null;
    }
    const now = new Date();
    const isStarted: boolean = this.eventStarted(event.start_at, now);
    const isEnded: boolean =
      event.end_at === null ? false : this.eventEnded(event.end_at, now);
    return [event, isStarted, isEnded];
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string): Promise<void> {
    return await this.eventRepository.remove(id);
  }

  async endEvent(id: string): Promise<Event> {
    return await this.eventRepository.endEvent(id);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await this.eventRepository.getUpcomingEvents();
  }

  async getEndedEvents(): Promise<Event[]> {
    return await this.eventRepository.getEndedEvents();
  }

  async startEvent(id: string): Promise<Event> {
    return await this.eventRepository.update(id, {
      status: EventStatus.STATUS_STARTED,
    });
  }

  private isValidEventEndDate(eventEndDate: Date, now: Date): boolean {
    const datePlusThenMinutes = new Date(now);
    datePlusThenMinutes.setMinutes(datePlusThenMinutes.getMinutes() + 10);
    if (eventEndDate > datePlusThenMinutes) {
      return true;
    }
    return false;
  }

  private isValidEventStatusForEventDates(
    eventStartDate: Date,
    eventEndDate: Date | null,
    now: Date,
    status: EventStatus,
  ): [boolean, string | null] {
    if (eventStartDate < now && status !== EventStatus.STATUS_STARTED) {
      return [false, 'Event start date is in the past, status must be started'];
    }
    if (eventStartDate > now && status !== EventStatus.STATUS_UPCOMING) {
      return [
        false,
        'Event start date is in the future, status must be upcoming',
      ];
    }
    if (
      eventStartDate < now &&
      eventEndDate !== null &&
      eventEndDate < now &&
      status !== EventStatus.STATUS_ENDED
    ) {
      return [
        false,
        'Event start date and end date are in the past, status must be ended',
      ];
    }
    return [true, null];
  }

  private eventStarted(start_at: Date, now: Date): boolean {
    return start_at < now;
  }

  private eventEnded(end_at: Date, now: Date): boolean {
    return end_at < now;
  }
}
