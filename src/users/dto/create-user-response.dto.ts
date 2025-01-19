import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class CreateUserResponseDto<T> extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        username: 'john_doe',
        profile_id: '550e8400-e29b-41d4-a716-446655440000',
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
      },
    },
  })
  data: T;
}
