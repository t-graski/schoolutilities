export interface AddClass {
  departmentId: number;
  className: string;
}

export interface AddClassReturnValue {
  status: number;
  message: string;
  data?: {
    classId: number;
  };
}

export interface UpdateClass {
  departmentId: number;
  className: string;
  classId: number;
}

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

export interface ClassTable {
  classId: number;
  className: string;
  departmentId: number;
}

export interface AddJoinCode {
  schoolId: number;
  expireDate: Date;
  name?: string;
  personId: number;
}

export interface AddJoinCodeReturnValue {
  status: number;
  message: string;
  data?: {
    joinCodeId: number;
    joinCode: string;
  };
}

export interface RemoveJoinCode {
  joinCodeId: number;
}

export interface RemoveJoinCodeReturnValue {
  status: number;
  message: string;
}

export interface JoinCodeTable {
  joinCodeId: number;
  schoolId: number;
  joinCode: string;
  expireDate: Date;
  name: string;
  personId: number;
  creationDate: Date;
}

export interface updateJoinCode {
  joinCodeId: number;
  expireDate?: Date;
  name?: string;
}
