import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { TccStudents } from '../entities/tcc-students.entity';

export class CreateTccStudentResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    type: ApiResponseDto<{ tccStudent: TccStudents }>,
  })
  data: {
    tccStudent: TccStudents;
  };
}
