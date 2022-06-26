import { IsNotEmpty, IsNumber, isNumber, IsString } from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';

export class GetGradeDto {
  @IsNotEmpty()
  courseUUID: string;
}

export class ValuationDto {
  @IsNotEmpty()
  @IsCustomUUID()
  elementUUID: string;

  @IsNotEmpty()
  @IsCustomUUID()
  userUUID: string;

  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsString()
  notes: string;
}

export class DeleteValuationDto {
  @IsNotEmpty()
  @IsCustomUUID()
  elementUUID: string;
}
