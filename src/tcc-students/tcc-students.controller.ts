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
  async create(@Body() createTccStudentDto: CreateTccStudentDto) {
    try {
      const tccStudents =
        await this.tccStudentsService.create(createTccStudentDto);
      return tccStudents;
    } catch (err) {
      if (process.env.APP_ENV == 'development') {
        console.error(err);
      }
      return {
        message: 'Internal server error',
      };
    }
  }

  @Get()
  async findAll() {
    return await this.tccStudentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tccStudentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTccStudentDto: UpdateTccStudentDto,
  ) {
    return await this.tccStudentsService.update(id, updateTccStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tccStudentsService.remove(id);
  }
}
