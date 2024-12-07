import { Injectable } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Injectable()
export class PresencesService {
  create(createPresenceDto: CreatePresenceDto) {
    return 'This action adds a new presence';
  }

  findAll() {
    return `This action returns all presences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presence`;
  }

  update(id: number, updatePresenceDto: UpdatePresenceDto) {
    return `This action updates a #${id} presence`;
  }

  remove(id: number) {
    return `This action removes a #${id} presence`;
  }
}
