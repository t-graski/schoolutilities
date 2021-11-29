export interface AddClass {
  departmentId: number;
  className: string;
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

export interface GetDepartment {
  schoolId: number;
}

export interface AddDepartment {
  name: string;
  schoolId: number;
  isVisible?: boolean;
  childsVisible?: boolean;
}

export interface RemoveDepartment {
  departmentId: number;
}

export interface UpdateDepartment {
  name: string;
  departmentId: number;
  isVisible?: boolean;
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

export interface RemoveJoinCode {
  joinCodeId: number;
}

export interface UpdateJoinCode {
  joinCodeId: number;
  expireDate?: Date;
  name?: string;
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

export interface GetAllJoinCodes {
  schoolId: number;
}

export interface ReturnMessage {
  status: number;
  message?: string;
  data?: string | Object;
}
