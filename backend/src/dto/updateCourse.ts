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
    @IsCustomUUID()
    courseUUID: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    @IsNameAvailable()
    name: string;

    @IsOptional()
    @IsOptional()
    @IsString()
    @Length(2, 1000)
    courseDescription: string;

    @IsOptional()
    @IsOptional()
    @IsCustomUUID({
        each: true,
    })
    persons: string[];

    @IsOptional()
    @IsOptional()
    @IsCustomUUID({
        each: true,
    })
    classes: string[];
}
