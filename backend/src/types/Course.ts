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
    }
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
    name: string;
    courseDescription: string;
    classId: number;
    subjectId: number;
  }