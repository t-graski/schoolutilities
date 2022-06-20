import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetGradeDto {
  @IsNotEmpty()
  courseUUID: string;
}
