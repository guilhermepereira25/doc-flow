import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class GetAllEventsResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      events: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'EVENT 1',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'EVENT 2',
        },
      ],
    },
  })
  data: {
    events: Event[];
  };
}
