import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { Presence } from '../entities/presence.entity';

export class GetPresenceResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    type: 'object',
    properties: {
      presence: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          eventId: { type: 'string' },
          isPresent: { type: 'boolean' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  })
  data: {
    presence: Presence;
  };
}
