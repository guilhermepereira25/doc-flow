import { Inject, Injectable } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { PresenceRepository } from './repositories/presence.repository.interface';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { Presence } from './entities/presence.entity';

@Injectable()
export class PresencesService {
  constructor(
    @Inject('IPresenceRepository')
    private readonly presenceRepository: PresenceRepository,
    private readonly eventService: EventsService,
    private readonly userService: UsersService,
  ) {}

  async create(
    userId: string,
    createPresenceDto: CreatePresenceDto,
  ): Promise<null | Presence> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const [event, isStarted, isEnded] = await this.eventService.findOne(
      createPresenceDto.event_id,
    );
    if (!event) {
      throw new Error('Event not found');
    }
    if (!isStarted || isEnded) {
      throw new Error('Event is not started or already ended');
    }

    const [presence, created] =
      await this.presenceRepository.findOrCreatedPresence(
        userId,
        createPresenceDto.event_id,
        createPresenceDto.status,
        createPresenceDto.check_in_date,
        createPresenceDto.check_out_date,
      );
    if (!created) {
      return null;
    }
    return presence;
  }

  async findAll() {
    return await this.presenceRepository.findAll();
  }

  async findOne(id: string) {
    return await this.presenceRepository.findOne(id);
  }

  async update(id: string, updatePresenceDto: UpdatePresenceDto) {
    return await this.presenceRepository.update(id, updatePresenceDto);
  }

  async remove(id: string) {
    return await this.presenceRepository.remove(id);
  }

  async findAllByEvent(eventId: string) {
    return await this.presenceRepository.findAllByEvent(eventId);
  }

  async findAllByUser(userId: string) {
    return await this.presenceRepository.findAllByUser(userId);
  }
}
