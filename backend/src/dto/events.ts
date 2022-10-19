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
  courseElementUUID: string;
  courseFileSubmissionName: string;
  courseFileSubmissionDescription: string;
  courseFileSubmissionDueTimestamp: Date;
  courseFileSubmissionSubmitLater: boolean;
  courseFileSubmissionSubmitLaterTimestamp: Date;
  courseFileSubmissionMaxFileSize: number;
  courseFileSubmissionAllowedFileTypes: string;
}


