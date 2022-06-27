import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
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
  @IsPositive()
  grade: number;

  @IsNotEmpty()
  @IsString()
  notes: string;
}

export class GetValuationDto {
  @IsNotEmpty()
  @IsCustomUUID()
  elementUUID: string;

  @IsNotEmpty()
  @IsCustomUUID()
  userUUID: string;
}

export class DeleteValuationDto {
  @IsNotEmpty()
  @IsCustomUUID()
  elementUUID: string;
}
