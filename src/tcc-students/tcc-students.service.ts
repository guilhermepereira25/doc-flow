import { Injectable } from '@nestjs/common';
import { CreateTccStudentDto } from './dto/create-tcc-student.dto';
import { UpdateTccStudentDto } from './dto/update-tcc-student.dto';

@Injectable()
export class TccStudentsService {
  create(createTccStudentDto: CreateTccStudentDto) {
    return 'This action adds a new tccStudent';
  }

  findAll() {
    return `This action returns all tccStudents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tccStudent`;
  }

  update(id: number, updateTccStudentDto: UpdateTccStudentDto) {
    return `This action updates a #${id} tccStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} tccStudent`;
  }
}
