export interface AddCourse {
  name: string;
  courseDescription?: string;
  schoolUUID: string;
  persons?: string[];
  classes?: string[];
}

export interface AddUser {
  courseId: number;
  personId: number;
}

export interface RemoveCourse {
  courseUUID: string;
}

export interface UpdateCourse {
  courseUUID: string;
  courseName: string;
  courseDescription: string;
  subjectId: number;
  classes: string[];
  persons: string[];
}

export interface CourseTable {
  courseId: number;
  name: string;
  courseDescription: string;
  schoolId: number;
  subjectId: number;
  classId: number;
}

export interface CourseUser {
  courseId: number;
  personId: number;
}

export interface RemoveUser {
  courseId: number;
  personId: number;
}

export interface ReturnMessage {
  status: number;
  message?: string;
  data?: string | Object;
}
