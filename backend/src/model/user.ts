/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * SchoolUtilities API
 * OpenAPI spec version: 1.0
 */
import type { UserSetting } from "./userSetting";

export interface User {
  userUUID: string;
  userFirstname: string;
  userLastname: string;
  userBirthDate: string;
  userEmail: string;
  userEmailVerified: boolean;
  userCreationTimestamp: string;
  userLastLoginTimestamp: string;
  articles: string[];
  courseElements: string[];
  fileSubmissionGrades: string[];
  fileSubmissions: string[];
  courses: string[];
  schools: string[];
  userSettings: UserSetting;
  timeTableElements: string[];
  schoolRoleName: string;
}
