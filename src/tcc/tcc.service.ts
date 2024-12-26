import { Injectable } from '@nestjs/common';
import { CreateTccDto } from './dto/create-tcc.dto';
import { UpdateTccDto } from './dto/update-tcc.dto';

@Injectable()
export class TccService {
  create(createTccDto: CreateTccDto) {
    return 'This action adds a new tcc';
  }

  findAll() {
    return `This action returns all tcc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tcc`;
  }

  update(id: number, updateTccDto: UpdateTccDto) {
    return `This action updates a #${id} tcc`;
  }

  remove(id: number) {
    return `This action removes a #${id} tcc`;
  }
}
