export const PASSWORD = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
};

export const LENGTHS = {
  PERSON_NAME: {
    min: 2,
    max: 26,
  },
  EMAIL: {
    min: 6,
    max: 100,
  },
  PASSWORD: {
    min: 8,
    max: 256,
  },
  NAME: {
    min: 1,
    max: 60,
  },
  COURSE_NAME: {
    min: 1,
    max: 25,
  },
  COURSE_DESCRIPTION: {
    min: 0,
    max: 1000,
  },
  CLASS_NAME: {
    min: 1,
    max: 25,
  },
  DEPARTMENT_NAME: {
    min: 1,
    max: 25,
  },
  JOIN_CODE_NAME: {
    min: 0,
    max: 25,
  },
  MAX_JOIN_CODES: 10,
  MAX_FILE_SIZE: 100000000,
};

const RETURN_MESSAGES = {
  INVALID_INPUT_MESSAGE: "Invalid input",
  DATABASE_ERROR_MESSAGE: "Database error",
  SUCCESS_MESSAGE: "Operation successfully executed",
  ALREADY_EXISTS_MESSAGE: "Entry already exists",
  NOT_FOUND_MESSAGE: "Entry not found",
  REFERENCE_ERROR_MESSAGE: "Foreign key reference error",
  UNIQUE_ERROR_MESSAGE: "Unique constraint error",
  MAX_JOIN_CODES_REACHED_MESSAGE: `Maximum number of join codes reached (${LENGTHS.MAX_JOIN_CODES})`,
  INVALID_FILE_MESSAGE: "Invalid file type provided",
  FILE_SIZE_EXCEEDED_MESSAGE: `Maximum file size exceeded ${LENGTHS.MAX_FILE_SIZE} bytes`,
  NO_FILE_PROVIDED_MESSAGE: "No file provided",
  DEPARTMENTS_SAME_NAMES_MESSAGE: "Department name occurs multiple times",
  LAST_USER_MESSAGE: "Cannot delete last user",
};

export const ID_STARTERS = {
  INTERNAL: 0,
  USER: 1,
  SCHOOL: 2,
  DEPARTMENT: 3,
  CLASS: 4,
  COURSE: 5,
  FILES: 6,
  TIMEZONES: 7,
  EMAIL: 8,
};

export const PASSWORD_VALIDATION_MESSAGES = [
  {
    regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
    errorMessage: "one lowercase and uppercase letter",
    validIconName: "SvgCheckMark",
    invalidIconName: "SvgExclamination",
  },
  {
    regex: /.*[0-9].*/,
    errorMessage: "one number",
    validIconName: "SvgCheckMark",
    invalidIconName: "SvgExclamination",
  },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    errorMessage: "one special character",
    validIconName: "SvgCheckMark",
    invalidIconName: "SvgExclamination",
  },
  {
    regex: /.{8,}/,
    errorMessage: "8 or more letters",
    validIconName: "SvgCheckMark",
    invalidIconName: "SvgExclamination",
  },
];

export const appRoutes = {
  HOME: "/",
  NOT_FOUND: "/404",
  ABOUT_US: "/about-us",
  AUTH: "/auth",
  AUTH_LOGIN: "/auth?tab=login",
  AUTH_REGISTER: "/auth=tab=register",
  AUTH_EMAIL_CHANGE: "/auth/email-change",
  AUTH_PASSWORD_RESET: "/auth/password-reset",
  AUTH_REGISTER_APPROVED: "/auth/register-approved",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  BRANDING: "/branding",
  CHANGE_LOGS: "/change-logs",
  CHANGE_LOGS_COURSES_BUG_FIXES: "/change-logs/courses-bug-fixes",
  CHANGE_LOGS_COURSES_ELEMENT_CREATION: "/change-logs/courses-element-creation",
  CHANGE_LOGS_LOGIN_REGISTRATION_SCHOOL_CREATE:
    "/change-logs/login-registration-school-create",
  CHANGE_LOGS_NEW_COURSE_ELEMENTS_BUG_FIXES:
    "/change-logs/new-course-elements-bug-fixes",
  COCKPIT: "/cockpit",
  COCKPIT_ARTICLES: "/cockpit/articles",
  COCKPIT_ARTICLES_DETAILS: "/cockpit/articles/[articleUUID]",
  COCKPIT_ARTICLES_EDIT: "/cockpit/articles/[articleUUID]/edit",
  COCKPIT_ARTICLES_CREATE: "/cockpit/articles/create",
  CONTACT_US: "/contact-us",
  DATA_POLICY: "/data-policy",
  FEATURES: "/features",
  HELP: "/help",
  HELP_ARTICLES_DETAILS: "/help/articles/[articleUUID]",
  HELP_ARTICLES_WHAT_IS_SCHOOLUTILITIES:
    "/help/articles/what-is-schoolutilities",
  HELP_FAQ: "/help/faq",
  LOGIN_REDIRECT: "/loginRedirect",
  PROFILE_SETTINGS: "/profile/settings",
  SCHOOL_DETAILS: "/school/[schoolUUID]",
  SCHOOL_DETAILS_COURSE: "/school/[schoolUUID]/course",
  SCHOOL_DETAILS_COURSE_DETAILS: "/school/[schoolUUID]/course/[courseUUID]",
  SCHOOL_DETAILS_COURSE_DETAILS_EDIT:
    "/school/[schoolUUID]/course/[courseUUID]/edit",
  SCHOOL_DETAILS_COURSE_DETAILS_ELEMENTS:
    "/school/[schoolUUID]/course/[courseUUID]/elements",
  SCHOOL_DETAILS_COURSE_DETAILS_SUBMISSION_DETAILS:
    "/school/[schoolUUID]/course/[courseUUID]/submission/[submissionUUID]",
  SCHOOL_DETAILS_CREATE_COURSE: "/school/[schoolUUID]/course/create-course",
  SCHOOL_DETAILS_EDIT: "/school/[schoolUUID]/edit",
  SCHOOL_CREATE: "/school/create",
  SCHOOL_JOIN: "/school/join",
  SCHOOL_SELECT: "/school/select",
  DASHBOARD: "/dashboard",
};
