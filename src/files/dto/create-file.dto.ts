import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../enum/file-type.enum';
import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FileType)
  type: FileType;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  eventId: string;
}
