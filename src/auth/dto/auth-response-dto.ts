import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponse as ApiResponseInstance } from '../../lib/api-response';

export class AuthResponseDto<T> extends OmitType(ApiResponseInstance, [
  'data',
]) {
  @ApiProperty({
    example: {
      accessToken: 'token',
    },
  })
  data: T;
}
