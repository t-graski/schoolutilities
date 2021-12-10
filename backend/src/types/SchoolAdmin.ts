export interface AddClass {
  departmentUUID: string;
  className: string;
}

export interface UpdateClass {
  departmentUUID: string;
  className: string;
  classUUID: string;
}

export interface AddSchool {
  name: string;
  languageId: number;
  timezone: string;
}

export interface GetClasses {
  schoolUUID: string;
}

export interface GetDepartment {
  schoolId: number;
}

export interface GetDepartments {
  schoolUUID: string;
}

export interface AddDepartment {
  departmentName: string;
  schoolUUID: string;
  isVisible?: string;
  childsVisible?: string;
}

export interface RemoveDepartment {
  departmentId: number;
}

export interface UpdateDepartment {
  departmentName: string;
  departmentUUID: string;
  isVisible?: boolean;
  childsVisible?: boolean;
}

export interface ClassTable {
  classId: number;
  className: string;
  departmentId: number;
}

export interface JoinSchool {
  schoolUUID: string;
  personUUID: string;
}

export interface AddJoinCode {
  schoolUUID: string;
  expireDate?: Date;
  joinCodeName?: string;
}

export interface RemoveJoinCode {
  joinCode: string;
}

export interface UpdateJoinCode {
  joinCode: string;
  expireDate?: string;
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
  schoolUUID: string;
}

export interface ReturnMessage {
  status: number;
  message?: string;
  data?: string | Object;
}

export interface UserPermissions {
  personUUID: string;
}

export interface DecodedJWT {
  personUUID: string;
  exp: number;
  iat: number;
}
