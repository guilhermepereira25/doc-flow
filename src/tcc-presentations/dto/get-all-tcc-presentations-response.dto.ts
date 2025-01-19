import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';
import { TccPresentation } from '../entities/tcc-presentation.entity';

export class GetAllTccPresentationsResponseDto extends OmitType(
  ApiResponseDto,
  ['data'] as const,
) {
  @ApiProperty({
    example: {
      tccPresentations: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          presentationDate: '2021-01-01T00:00:00.000Z',
          tccId: '550e8400-e29b-41d4-a716-446655440000',
          createdAt: '2021-01-01T00:00:00.000Z',
          updatedAt: '2021-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  data: TccPresentation[];
}
