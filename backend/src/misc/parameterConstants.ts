import { HttpStatus } from '@nestjs/common';

export const LENGTHS = {
  PERSON_NAME: {
    min: 3,
    max: 16,
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
};

export const RETURN_MESSAGES = {
  INVALID_INPUT_MESSAGE: 'Invalid input',
  DATABASE_ERORR_MESSAGE: 'Database error', 
  SUCCESS_MESSAGE: 'Operation successfully executed',
  ALREADY_EXISTS_MESSAGE: 'Entry already exists',
  NOT_FOUND_MESSAGE: 'Entry not found',
  REFERENCE_ERROR_MESSAGE: 'Foreign key reference error',
  MAX_JOIN_CODES_REACHED_MESSAGE: `Maximum number of join codes reached (${LENGTHS.MAX_JOIN_CODES})`
};

export const RETURN_DATA = {
  INVALID_INPUT: {
    status: HttpStatus.BAD_REQUEST,
    message: RETURN_MESSAGES.INVALID_INPUT_MESSAGE,
  },
  DATABASE_ERORR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: RETURN_MESSAGES.DATABASE_ERORR_MESSAGE,
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
  MAX_JOIN_CODES_REACHED: {
    status: HttpStatus.FORBIDDEN,
    message: RETURN_MESSAGES.MAX_JOIN_CODES_REACHED_MESSAGE,
  },
};
