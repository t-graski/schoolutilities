import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';

export class GetEventsDto {
  @IsNotEmpty()
  @IsCustomUUID()
  schoolUUID: string;

  @IsNotEmpty()
  @IsNumber()
  days: number;
}
