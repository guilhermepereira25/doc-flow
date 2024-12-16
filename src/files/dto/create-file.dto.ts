import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../files.enum';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FileType)
  type: FileType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
