import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TccStudentsService } from './tcc-students.service';
import { CreateTccStudentDto } from './dto/create-tcc-student.dto';
import { UpdateTccStudentDto } from './dto/update-tcc-student.dto';

@Controller('tcc-students')
export class TccStudentsController {
  constructor(private readonly tccStudentsService: TccStudentsService) {}

  @Post()
  create(@Body() createTccStudentDto: CreateTccStudentDto) {
    return this.tccStudentsService.create(createTccStudentDto);
  }

  @Get()
  findAll() {
    return this.tccStudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tccStudentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTccStudentDto: UpdateTccStudentDto,
  ) {
    return this.tccStudentsService.update(+id, updateTccStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tccStudentsService.remove(+id);
  }
}
