import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  status: number;

  data: T | null;

  @ApiProperty({
    example: true,
    description: 'Response success status',
  })
  success: boolean;

  @ApiProperty()
  error: string[] | null | string;
}
