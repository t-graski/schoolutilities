import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsArrayUnique } from 'src/decorators/IsArrayUnique';
import { IsCourseExist } from 'src/decorators/IsCourseExist';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';
import { IsNameAvailable } from 'src/decorators/IsNameAvailable';
import { IsSchoolExist } from 'src/decorators/IsSchoolExist';
import { IsUserUUIDExist } from 'src/decorators/IsUserUUIDExist';

export class CourseDto {
  @IsNotEmpty()
  @IsInt()
  courseId: number;

  @IsNotEmpty()
  @IsCustomUUID()
  courseUUID: string;

  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(2, 1000)
  courseDescription: string;

  @IsNotEmpty()
  @IsInt()
  schoolId: number;

  @IsNotEmpty()
  @IsDate()
  creationDate: Date;

  @IsNotEmpty()
  @IsInt()
  personCreationId: number;
}

export class AddCourseDto {
  @ApiProperty({
    description: 'The name of the course',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @IsNameAvailable()
  name: string;

  @ApiProperty({
    description: 'The description of the course',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(2, 1000)
  courseDescription: string;

  @ApiProperty({
    description: 'The id of the school',
    type: Number,
  })
  @IsNotEmpty()
  @IsCustomUUID()
  @IsSchoolExist()
  schoolUUID: string;

  @ApiProperty({
    description: 'The user of a course',
    type: [String],
  })
  @IsOptional()
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  @IsUserUUIDExist({
    each: true,
  })
  persons: string[];

  @ApiProperty({
    description: 'The classes of a course',
    type: [String],
  })
  @IsOptional()
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  classes: string[];
}

export class RemoveCourseDto {
  @IsNotEmpty()
  @IsCustomUUID()
  @IsCourseExist()
  courseUUID: string;
}

export class UpdateCourseDto {
  @IsNotEmpty()
  @IsCustomUUID()
  @IsCourseExist()
  courseUUID: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  courseName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  courseDescription: string;

  @IsOptional()
  subjectId: number;

  @IsOptional()
  @IsOptional()
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  persons: string[];

  @IsOptional()
  @IsOptional()
  @IsArrayUnique()
  @IsCustomUUID({
    each: true,
  })
  classes: string[];
}

export class GetAllCoursesDto {
  @IsOptional()
  @IsCustomUUID()
  @IsSchoolExist()
  schoolUUID: string;
}
