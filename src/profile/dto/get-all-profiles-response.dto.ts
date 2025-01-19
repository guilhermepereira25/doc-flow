import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { Profile } from '../entities/profile.entity';

export class GetAllProfilesResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      profiles: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'admin',
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  data: {
    profiles: Profile[];
  };
}
