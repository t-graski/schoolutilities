import { IsNotEmpty, IsNumberString, IsPositive } from 'class-validator';
import { IsCustomUUID } from 'src/decorators/IsCustomUUID';

export class GetEventsDto {
  @IsNotEmpty()
  @IsCustomUUID()
  schoolUUID: string;

  @IsNotEmpty()
  @IsNumberString()
  days: number;
}

export class CourseEvent {
  schoolUUID: string;
  schoolName: string;
  courseUUID: string;
  courseName: string;
  elementUUID: string;
  elementName: string;
  description: string;
  dueDate: Date;
  submitLater: boolean;
  submitLaterDate: Date;
  maxFileSize: number;
  allowedFileTypes: string;
}


