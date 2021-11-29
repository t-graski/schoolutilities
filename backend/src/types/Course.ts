export interface AddCourse {
  name: string;
  courseDescription?: string;
  schoolId: number;
  subjectId?: number;
  classId?: number;
}

export interface AddUser {
  courseId: number;
  personId: number;
}

export interface RemoveCourse {
  courseId: number;
}

export interface UpdateCourse {
  courseId: number;
  name: string;
  courseDescription: string;
  classId: number;
  subjectId: number;
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
