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
  DISPLAY_NAME: {
    min: 4,
    max: 16,
  },
  BIOGRAPHY: {
    min: 0,
    max: 1000,
  },
  LOCATION: {
    min: 0,
    max: 100,
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
  COURSE_ELEMENT: 9,
  ARTICLE: 'A',
  BREAK: 'B',
  EVENT: 'E',
  EXAM: 'X',
  HOLIDAYS: 'H',
  ROOM: 'R',
  SUBJECT: 'SS',
  SUBSTITUTION: 'S',
  NOTIFICATION: 'N',
  TIME_TABLE_ELEMENT: 'T',
};

export const ERROR_CODES = {
  USER_UUID_NULL_OR_INVALID: 'ERORR_100',
  USER_ID_NULL_OR_INVALID: 'ERORR_101',
  USER_ID_OR_UUID_NULL_OR_INVALID: 'ERORR_102',
  USER_EMAIL_NULL_OR_INVALID: 'ERORR_103',
  SCHOOL_UUID_NULL_OR_INVALID: 'ERORR_200',
  SCHOOL_ID_NULL_OR_INVALID: 'ERORR_201',
  COURSE_UUID_NULL_OR_INVALID: 'ERORR_300',
  COURSE_ID_NULL_OR_INVALID: 'ERORR_301',
  DATABASE_ERROR: 'ERROR_400',
  ELEMENT_ID_OR_TYPE_ID_NULL_OR_INVALID: 'ERROR_500',
  ELEMENT_UUID_NULL_OR_INVALID: 'ERROR_501',
  ELEMENT_ID_NULL_OR_INVALID: 'ERROR_502',
  ELEMENT_OPTIONS_NULL: 'ERROR_503',
  ELEMENT_NULL: 'ERROR_504',
  NO_JWT_TOKEN_PROVIDED: 'ERROR_600',
  CLASS_UUID_NULL_OR_INVALID: 'ERROR_700',
  ARTICLE_UUID_NULL_OR_INVALID: 'ERROR_800',
  EMAIL_NULL_OR_INVALID: 'ERROR_900',
  TOKEN_NULL_OR_INVALID: 'ERROR_1000',
};

export const UNTIS_API_URL = 'https://mese.webuntis.com/WebUntis/jsonrpc.do?school=htbla linz leonding';
