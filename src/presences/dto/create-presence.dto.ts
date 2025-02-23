import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsISO8601 } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePresenceDto {
  @ApiProperty()
  @IsNotEmpty()
  event_id: string;
  @ApiProperty()
  @IsNotEmpty()
  status: string;
  @ApiProperty({
    description: 'Check out date',
    example: '2024-12-14T10:00:00Z',
  })
  @IsOptional() // Agora é opcional na validação
  @Transform(({ value }) => (value === '' ? null : value))
  @IsISO8601({}, { message: 'Incorrect date format' })
  check_in_date?: string;

  @ApiProperty({
    description: 'Check out date',
    example: '2024-12-14T10:00:00Z',
  })
  @IsOptional() // Agora é opcional na validação
  @Transform(({ value }) => (value === '' ? null : value))
  @IsISO8601({}, { message: 'Incorrect date format' })
  check_out_date?: string;
}
