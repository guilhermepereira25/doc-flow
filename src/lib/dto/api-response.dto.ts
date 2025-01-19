import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    description: 'HTTP status code',
  })
  status: number;

  @ApiProperty({
    description: 'Response data',
  })
  data: T | null;

  @ApiProperty({
    description: 'Response success status',
  })
  success: boolean;

  @ApiProperty({
    description: 'Error',
  })
  error: string[] | null | string;

  constructor(
    status: number,
    success: boolean,
    data: T | null,
    error: string[] | null | string,
  ) {
    this.status = status;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
