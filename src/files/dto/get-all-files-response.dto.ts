import { ApiProperty, OmitType } from '@nestjs/swagger';
import { File } from '../entities/file.entity';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class GetAllFilesResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      files: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'example.pdf',
          type: 'application/pdf',
          url: '../fileStorage',
          user_id: '550e8400-e29b-41d4-a716-446655440002',
          event_id: '550e8400-e29b-41d4-a716-446655440003',
        },
      ],
    },
  })
  data: {
    files: File[];
  };
}
