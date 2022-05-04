import { Exclude } from 'class-transformer';

export class CourseEntity {
  courseUUID: string;
  name: string;
  courseDescription: string;
  creationDate: Date;

  @Exclude()
  personCreationId: number;

  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
  }
}
