export interface AddSchool {
  name: string;
  languageId: number;
  timezone: string;
}

export interface AddSchoolReturnValue {
  status: number;
  message: string;
  data?: {
    schoolId: number;
  };
}

export interface AddDepartment {
  name: string;
  schoolId: number;
  isVisible?: string;
  childsVisible?: boolean;
}

export interface AddDepartmentReturnValue {
  status: number;
  message: string;
  data?: {
    departmentId: number;
  };
}

export interface ReturnMessage {
  status: number;
  message: string;
}

export interface UpdateDepartment {
  name: string;
  departmentId: number;
  isVisible?: string;
  childsVisible?: boolean;
}
