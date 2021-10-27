export interface AddCourse {
  name: string;
  courseDescription?: string;
  schoolId: number;
  subjectId?: number;
  classId?: number;
}

export interface AddCourseReturnValue {
  status: number;
  message: string;
  data?: {
    courseId: number;
    name: string;
    courseDescription: string;
    schoolId: number;
    subjectId: number;
    classId: number;
  };
}

export interface AddUser {
  courseId: number;
  personId: number;
}

export interface AddUserReturnValue {
  status: number;
  message: string;
  data?: {
    courseId: number;
  };
}

export interface CourseTable {
  courseId: number;
  name: string;
  courseDescription: string;
  schoolId: number;
  subjectId: number;
  classId: number;
}

export interface UpdateCourse {
  courseId: number;
  name: string;
  courseDescription: string;
  classId: number;
  subjectId: number;
}

export interface CourseUser {
  courseId: number;
  personId: number;
}

export interface RemoveUser {
  courseId: number;
  userId: number;
}
