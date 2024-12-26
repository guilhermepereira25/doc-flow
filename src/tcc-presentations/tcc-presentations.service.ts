import { Injectable } from '@nestjs/common';
import { CreateTccPresentationDto } from './dto/create-tcc-presentation.dto';
import { UpdateTccPresentationDto } from './dto/update-tcc-presentation.dto';

@Injectable()
export class TccPresentationsService {
  create(createTccPresentationDto: CreateTccPresentationDto) {
    return 'This action adds a new tccPresentation';
  }

  findAll() {
    return `This action returns all tccPresentations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tccPresentation`;
  }

  update(id: number, updateTccPresentationDto: UpdateTccPresentationDto) {
    return `This action updates a #${id} tccPresentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} tccPresentation`;
  }
}
