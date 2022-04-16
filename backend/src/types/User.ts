export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UserData {
  personId: number;
  email: string;
  password: string;
  roles?: UserRole[];
}

export interface UserRoleData {
  userId: number;
}

export interface UserRole {
  schoolId: number;
  roleId: number;
}
