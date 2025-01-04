import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTccStudentDto {
  @IsNotEmpty({
    message: 'students is required',
  })
  @IsArray({
    message: 'students must be an array of user ids',
  })
  students: string[];

  @IsNotEmpty({
    message: 'tccId is required',
  })
  @IsUUID(4)
  tccId: string;
}
