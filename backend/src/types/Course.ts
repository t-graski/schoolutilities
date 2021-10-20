export interface AddCourse {
    name: string;
    courseDescription?: string;
    schoolId: number;
    subjectId: number;
    classId: number;
}

export interface AddCourseReturnValue {
    status: number;
    message: string;
    data?: {
        courseId: number;
    }
}