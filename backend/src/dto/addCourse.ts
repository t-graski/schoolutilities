import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  @ApiProperty()
  courseDescription: string;

  @IsNotEmpty()
  @IsCustomUUID()
  @ApiProperty()
  schoolUUID: string;

  @IsOptional()
  @IsArrayUnique()
  @ApiProperty()
  @IsCustomUUID({
    each: true,
  })
  @IsUserUUIDExist({
    each: true,
  })
  persons: string[];

  @IsOptional()
  @IsArrayUnique()
  @ApiProperty()
  @IsCustomUUID({
    each: true,
  })
  classes: string[];
}
