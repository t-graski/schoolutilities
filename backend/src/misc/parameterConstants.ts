import { HttpStatus } from '@nestjs/common';

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
  FORBIDDEN_MESSAGE: 'Forbidden',
};

export const RETURN_DATA = {
  INVALID_INPUT: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.INVALID_INPUT_MESSAGE,
  },
  DATABASE_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: RETURN_MESSAGES.DATABASE_ERROR_MESSAGE,
  },
  SUCCESS: {
    status: HttpStatus.OK,
    message: RETURN_MESSAGES.SUCCESS_MESSAGE,
  },
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: RETURN_MESSAGES.ALREADY_EXISTS_MESSAGE,
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: RETURN_MESSAGES.NOT_FOUND_MESSAGE,
  },
  REFERENCE_ERROR: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.REFERENCE_ERROR_MESSAGE,
  },
  UNIQUE_ERROR: {
    status: HttpStatus.CONFLICT,
    message: RETURN_MESSAGES.UNIQUE_ERROR_MESSAGE,
  },
  MAX_JOIN_CODES_REACHED: {
    status: HttpStatus.FORBIDDEN,
    message: RETURN_MESSAGES.MAX_JOIN_CODES_REACHED_MESSAGE,
  },
  INVALID_FILE: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.INVALID_FILE_MESSAGE,
  },
  MAX_FILE_SIZE_EXCEEDED: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.FILE_SIZE_EXCEEDED_MESSAGE,
  },
  NO_FILE_PROVIDED: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.NO_FILE_PROVIDED_MESSAGE,
  },
  DEPARTMENTS_SAME_NAMES: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.DEPARTMENTS_SAME_NAMES_MESSAGE,
  },
  LAST_USER: {
    status: HttpStatus.CONFLICT,
    message: RETURN_MESSAGES.LAST_USER_MESSAGE,
  },
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message: RETURN_MESSAGES.FORBIDDEN_MESSAGE,
  },
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
