import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class EndEventResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      message: 'Event ended',
    },
  })
  data: {
    message: string;
  };
}
