import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { ERROR_CODES } from 'src/misc/parameterConstants';
import validator from 'validator';
const prisma = new PrismaClient();

@Injectable()
export class HelperService {
    constructor(private readonly jwtService: JwtService) { }
    async getUserIdByUUID(userUUID: string): Promise<number> {
        if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        personUUID: userUUID,
                    },
                });
                return user.personId;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
        }
    }

    async getUserUUIDById(userId: number): Promise<string> {
        if (userId) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        personId: userId,
                    },
                });
                return user.personUUID;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
        }
    }

    async getUserIdByEmail(email: string): Promise<number> {
        if (email && validator.isEmail(email)) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        email: email,
                    },
                });
                return user.personId;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_EMAIL_NULL_OR_INVALID);
        }
    }

    async getUserById(userId: number): Promise<any> {
        if (userId) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        personId: userId,
                    },
                });
                return user;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_ID_NULL_OR_INVALID);
        }
    }

    async getUserByUUID(userUUID: string): Promise<any> {
        if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        personUUID: userUUID,
                    },
                });
                return user;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
        }
    }

    async getUserByEmail(email: string): Promise<any> {
        if (email && validator.isEmail(email)) {
            try {
                const user = await prisma.persons.findFirst({
                    where: {
                        email: email,
                    },
                });
                return user;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_EMAIL_NULL_OR_INVALID);
        }
    }

    async getSchoolsOfUser(userId: number, userUUID: string): Promise<any> {
        if (!userId && !userUUID) {
            throw new Error(ERROR_CODES.USER_ID_OR_UUID_NULL_OR_INVALID);
        }

        if (userUUID && validator.isUUID(userUUID.slice(1), 4)) {
            userId = await this.getUserIdByUUID(userUUID);
            try {
                const schools = await prisma.schoolPersons.findMany({
                    where: {
                        personId: userId,
                    }, select: {
                        schoolId: true,
                    },
                });
                const schoolData = [];

                for (const school of schools) {
                    const schoolInfo = await this.getSchoolById(school.schoolId);
                    schoolData.push(schoolInfo);
                }
                return schoolData;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
        }
    }

    async getSchoolById(schoolId: number): Promise<any> {
        if (schoolId) {
            try {
                const school = await prisma.schools.findFirst({
                    where: {
                        schoolId: schoolId,
                    },
                });
                return school;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.SCHOOL_ID_NULL_OR_INVALID);
        }
    }

    async getSchoolUUIDById(schoolId: number): Promise<string> {
        if (schoolId) {
            try {
                const school = await prisma.schools.findFirst({
                    where: {
                        schoolId: schoolId,
                    },
                });

                return school.schoolUUID;

            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.SCHOOL_ID_NULL_OR_INVALID);
        }
    }


    async extractJWTToken(request): Promise<string> {
        try {
            return request.headers.authorization.split(' ')[1]
        } catch (err) {
            throw new Error(ERROR_CODES.NO_JWT_TOKEN_PROVIDED);
        }

    }

    async getPersonUUIDfromJWT(token: string): Promise<string> {
        if (!token) throw new Error(ERROR_CODES.NO_JWT_TOKEN_PROVIDED);
        const payload = this.jwtService.verify(token);
        return payload.personUUID;

    }

    async getCourseIdByUUID(courseUUID: string): Promise<number> {
        if (courseUUID && validator.isUUID(courseUUID.slice(1), 4)) {
            try {
                const course = await prisma.courses.findFirst({
                    where: {
                        courseUUID: courseUUID,
                    },
                });
                return course.courseId;
            } catch (err) {
                throw new Error(ERROR_CODES.DATABASE_ERROR);
            }
        } else {
            throw new Error(ERROR_CODES.USER_UUID_NULL_OR_INVALID);
        }
    }
}
