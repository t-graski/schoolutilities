import {
    IsNotEmpty,
} from 'class-validator';
import { IsCourseExist } from 'src/decorators/IsCourseExist';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';

export class RemoveCourseDto {
    @IsNotEmpty()
    @IsCustomUUID()
    @IsCourseExist()
    courseUUID: string
}
