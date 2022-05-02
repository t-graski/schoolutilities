import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';
import { IsNameAvailable } from '../decorators/IsNameAvailable';

export class AddCourseDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @IsNameAvailable()
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  courseDescription: string;

  @IsNotEmpty()
  @IsCustomUUID()
  schoolUUID: string;

  @IsOptional()
  @IsCustomUUID({
    each: true,
  })
  persons: string[];

  @IsOptional()
  @IsCustomUUID({
    each: true,
  })
  classes: string[];
}
