export interface AddSchoolConfig {
  name: string;
  languageId: number;
  timezone: string;
}

export interface AddSchoolConfigReturnValue {
  status: number;
  message: string;
  data?: {
    schoolId: number;
  };
}
