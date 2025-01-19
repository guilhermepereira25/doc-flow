import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { Presence } from '../entities/presence.entity';

export class GetAllPresencesResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      data: {
        presences: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            event_id: '550e8400-e29b-41d4-a716-446655440000',
            user_id: '550e8400-e29b-41d4-a716-446655440000',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            event_id: '550e8400-e29b-41d4-a716-446655440000',
            user_id: '550e8400-e29b-41d4-a716-446655440000',
          },
        ],
      },
    },
  })
  data: {
    presences: Presence[];
  };
}
