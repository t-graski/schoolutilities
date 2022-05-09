import { IsNotEmpty, IsString } from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';

export class GetEventsDto {
  @IsNotEmpty()
  @IsCustomUUID()
  schoolUUID: string;

  @IsNotEmpty()
  @IsString()
  days: number;
}

export class CourseEvent {
  schoolUUID: string;
  schoolName: string;
  courseUUID: string;
  courseName: string;
  elementUUID: string;
  name: string;
  description: string;
  dueTime: Date;
  submitLater: boolean;
  submitLaterDate: Date;
  maxFileSize: number;
  allowedFileTypes: string;
}
