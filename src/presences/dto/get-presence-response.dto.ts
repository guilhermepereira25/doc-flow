import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { Presence } from '../entities/presence.entity';

export class GetPresenceResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      data: {
        presence: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          event_id: '550e8400-e29b-41d4-a716-446655440000',
          user_id: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
    },
  })
  data: {
    presence: Presence;
  };
}
