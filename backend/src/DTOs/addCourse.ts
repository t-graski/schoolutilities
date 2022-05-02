import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';
import { IsNameAvailable } from '../decorators/IsNameAvailable';

export class AddCourseDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @IsNameAvailable({
    message: 'Course with name $value already exists in this school.',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  courseDescription: string;

  @IsNotEmpty()
  @IsCustomUUID({
    message: '$value is not a valid UUID',
  })
  schoolUUID: string;

  @IsOptional()
  @IsCustomUUID({
    message: '$value is not a valid UUID',
    each: true,
  })
  persons: string[];

  @IsOptional()
  @IsString({
    each: true,
  })
  classes: string[];
}
