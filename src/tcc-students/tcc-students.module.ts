import { Module } from '@nestjs/common';
import { TccStudentsService } from './tcc-students.service';
import { TccStudentsController } from './tcc-students.controller';

@Module({
  controllers: [TccStudentsController],
  providers: [TccStudentsService],
})
export class TccStudentsModule {}
