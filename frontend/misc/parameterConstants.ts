

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
  INVALID_INPUT_MESSAGE: 'Invalid input',
  DATABASE_ERROR_MESSAGE: 'Database error',
  SUCCESS_MESSAGE: 'Operation successfully executed',
  ALREADY_EXISTS_MESSAGE: 'Entry already exists',
  NOT_FOUND_MESSAGE: 'Entry not found',
  REFERENCE_ERROR_MESSAGE: 'Foreign key reference error',
  UNIQUE_ERROR_MESSAGE: 'Unique constraint error',
  MAX_JOIN_CODES_REACHED_MESSAGE: `Maximum number of join codes reached (${LENGTHS.MAX_JOIN_CODES})`,
  INVALID_FILE_MESSAGE: 'Invalid file type provided',
  FILE_SIZE_EXCEEDED_MESSAGE: `Maximum file size exceeded ${LENGTHS.MAX_FILE_SIZE} bytes`,
  NO_FILE_PROVIDED_MESSAGE: 'No file provided',
  DEPARTMENTS_SAME_NAMES_MESSAGE: 'Department name occurs multiple times',
  LAST_USER_MESSAGE: 'Cannot delete last user',
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
