import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class AuthResponseDto<T> extends OmitType(ApiResponseDto, ['data']) {
  @ApiProperty({
    example: {
      accessToken: 'token',
    },
  })
  data: T;
}
