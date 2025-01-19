import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/lib/dto/api-response.dto';

export class DownloadFileResponseDto extends OmitType(ApiResponseDto, [
  'data',
] as const) {
  @ApiProperty({
    example: {
      message: 'File enqueued to be processed',
    },
  })
  data: {
    message: string;
  };
}
