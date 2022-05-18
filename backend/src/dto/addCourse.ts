import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsArrayUnique } from 'src/decorators/IsArrayUnique';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';
import { IsUserUUIDExist } from 'src/decorators/IsUserUUIDExist';
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
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  @IsUserUUIDExist({
    each: true,
  })
  persons: string[];

  @IsOptional()
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  classes: string[];
}