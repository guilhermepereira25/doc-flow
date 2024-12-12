import { IsNotEmpty } from 'class-validator';

export class CreatePresenceDto {
  @IsNotEmpty()
  event_id: string;
}
