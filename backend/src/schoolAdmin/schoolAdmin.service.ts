import { Injectable, HttpStatus, InternalServerErrorException, BadRequestException, Catch } from '@nestjs/common';
import { regex } from 'src/regex';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { LENGTHS, RETURN_DATA, ID_STARTERS } from 'src/misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import {
  AddClass,
  ReturnMessage,
  UpdateClass,
  AddDepartment,
  UpdateDepartment,
  AddJoinCode,
  RemoveJoinCode,
  UpdateJoinCode,
  JoinSchool,
  UserPermissions,
} from 'src/types/SchoolAdmin';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/auth/auth.service';
import { HelperService } from 'src/helper/helper.service';
import { AddSchoolDTO, School } from 'src/entity/school/school';
import { AddDepartmentDTO, DeleteDepartmentDTO, Department, UpdateDepartmentDTO } from 'src/entity/department/department';
import { AddSchoolClassDTO, DeleteSchoolClassDTO, SchoolClass, UpdateSchoolClassDTO } from 'src/entity/school-class/schoolClass';
import { AddJoinCodeDTO, DeleteJoinCodeDTO, JoinCode, JoinSchoolDTO, LeaveSchoolDTO, UpdateJoinCodeDTO } from 'src/entity/join-code/joinCode';
import { User } from 'src/entity/user/user';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const prisma = new PrismaClient();

@Injectable()
export class SchoolAdminService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
    private readonly helper: HelperService,
  ) { }

  async addSchoolConfig(payload: AddSchoolDTO, request: Request): Promise<School> {
    const { schoolName, schoolDescription, schoolLanguageId, schoolTimezone } = payload;

    try {
      const jwt = await this.helper.extractJWTToken(request);
      const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
      const school = await prisma.schools.create({
        data: {
          schoolUUID: `${ID_STARTERS.SCHOOL}${uuidv4()}`,
          schoolName,
          schoolDescription,
          schoolLanguageId,
          schoolTimezone,
          users: {
            connect: {
              userUUID,
            },
          },
          schoolUsers: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              },
            },
          },
          schoolUserRoles: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              },
              schoolRoles: {
                connect: {
                  schoolRoleId: 1,
                },
              },
            },
          },
        },
      });
      return new School(school);
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Database error');
    }
  }

  async addClass(payload: AddSchoolClassDTO): Promise<SchoolClass> {
    const { schoolClassDepartmentUUID, schoolClassName } = payload;

    try {
      const schoolClass = await prisma.schoolClasses.create({
        data: {
          schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
          schoolClassName,
          departments: {
            connect: {
              departmentUUID: schoolClassDepartmentUUID,
            },
          }
        },
      });
      return new SchoolClass(schoolClass);
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async removeClass(payload: DeleteSchoolClassDTO): Promise<number> {
    const { schoolClassUUID } = payload;
    try {
      await prisma.schoolClasses.delete({
        where: {
          schoolClassUUID,
        },
      });
      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async updateClass(payload: UpdateSchoolClassDTO): Promise<SchoolClass> {
    const { schoolClassUUID, schoolClassDepartmentUUID, schoolClassName } = payload;

    try {
      const schoolClass = await prisma.schoolClasses.update({
        where: {
          schoolClassUUID,
        },
        data: {
          schoolClassName,
          departments: {
            connect: {
              departmentUUID: schoolClassDepartmentUUID,
            },
          },
        },
      });
      return new SchoolClass(schoolClass);
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getClasses(schoolUUID: string, request: Request): Promise<SchoolClass[] | SchoolClass> {
    try {
      const schoolClasses = await prisma.schoolClasses.findMany({
        where: {
          departments: {
            schools: {
              schoolUUID,
            },
          },
        },
        include: {
          departments: true,
        }
      });

      return schoolClasses.map((schoolClass) => new SchoolClass({
        ...schoolClass,
        departments: new Department(schoolClass.departments),
      }));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getDepartments(schoolUUID: string): Promise<Department[]> {
    try {
      const departments = await prisma.departments.findMany({
        where: {
          schools: {
            schoolUUID
          },
        },
      })

      return departments.map((department) => new Department(department));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async addDepartment(payload: AddDepartmentDTO, request: Request): Promise<Department> {
    const { departmentName, departmentAbbreviation, schoolUUID, departmentIsVisible, departmentChildsVisible, schoolClasses } = payload;

    try {
      const department = await prisma.departments.create({
        data: {
          departmentUUID: `${ID_STARTERS.DEPARTMENT}${uuidv4()}`,
          departmentName,
          departmentAbbreviation,
          departmentIsVisible,
          departmentChildsVisible,
          schools: {
            connect: {
              schoolUUID,
            },
          },
          schoolClasses: {
            create: schoolClasses.map((schoolClass) => {
              return {
                schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
                schoolClassName: schoolClass,
              };
            }),
          }
        },
        include: {
          schoolClasses: true,
        }
      });
      return new Department({
        ...department,
        schoolClasses: department.schoolClasses.map((schoolClass) => new SchoolClass(schoolClass)),
      });
    } catch (err) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async addDepartments(payload: AddDepartmentDTO[], request: Request): Promise<Department[]> {

    const departmentNames = payload.map((department) => department.departmentName);
    const uniqueDepartmentNames = [...new Set(departmentNames)];
    if (departmentNames.length !== uniqueDepartmentNames.length) {
      throw new BadRequestException("Department names must be unique");
    }

    try {
      const departments = [];
      for (const department of payload) {
        departments.push(new Department(await this.addDepartment(department, request)));
      }
      return departments;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async removeDepartment(payload: DeleteDepartmentDTO): Promise<number> {
    const { departmentUUID } = payload;
    try {
      await prisma.departments.delete({
        where: {
          departmentUUID
        },
      });
      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async updateDepartment(payload: UpdateDepartmentDTO): Promise<Department> {
    const { departmentUUID, departmentName, departmentChildsVisible, departmentIsVisible, departmentAbbreviation, schoolClasses } = payload;

    try {
      await prisma.schoolClasses.deleteMany({
        where: {
          departments: {
            departmentUUID
          },
        },
      })


      const department = await prisma.departments.update({
        where: {
          departmentUUID
        },
        data: {
          departmentName,
          departmentChildsVisible,
          departmentIsVisible,
          departmentAbbreviation,
          schoolClasses: {
            create: schoolClasses.map((schoolClass) => {
              return {
                schoolClassUUID: `${ID_STARTERS.CLASS}${uuidv4()}`,
                schoolClassName: schoolClass,
              };
            }),
          },
        },
        include: {
          schoolClasses: true,
        }
      });
      return new Department({
        ...department,
        schoolClasses: department.schoolClasses.map((schoolClass) => new SchoolClass(schoolClass)),
      });
    } catch (err) {
      throw new InternalServerErrorException("Database error");
    }
  }

  async joinSchool(payload: JoinSchoolDTO, request: Request): Promise<School> {
    const jwt = await this.helper.extractJWTToken(request);
    const userUUID = await this.helper.getUserUUIDfromJWT(jwt);
    const { joinCode } = payload;

    const joinCodeSchool = await prisma.schoolJoinCodes.findUnique({
      where: {
        schoolJoinCode: joinCode,
      },
      include: {
        schools: true,
      }
    });

    if (joinCodeSchool) {
      const schoolUUID = joinCodeSchool.schools.schoolUUID;
      const school = await prisma.schools.update({
        where: {
          schoolUUID: schoolUUID,
        },
        data: {
          schoolUserRoles: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              },
              schoolRoles: {
                connect: {
                  schoolRoleId: 1,
                },
              }
            },
          },
          schoolUsers: {
            create: {
              users: {
                connect: {
                  userUUID,
                },
              }
            }
          },
        },
      });
      return new School(school);
    } else {
      throw new BadRequestException("Invalid join code");
    };
  }

  async leaveSchool(payload: LeaveSchoolDTO, request: Request): Promise<number> {
    const { schoolUUID } = payload;

    try {
      const jwt = await this.helper.extractJWTToken(request);
      const userUUID = await this.helper.getUserUUIDfromJWT(jwt);

      const schoolUsers = await prisma.schoolUsers.findMany({
        where: {
          schools: {
            schoolUUID,
          },
        },
      });

      if (schoolUsers.length === 1) {
        throw new BadRequestException("You are the last user in this school. You can't leave the school");
      }

      await prisma.schoolUsers.deleteMany({
        where: {
          users: {
            userUUID,
          },
          schools: {
            schoolUUID,
          },
        },
      });

      await prisma.schoolUserRoles.deleteMany({
        where: {
          users: {
            userUUID,
          },
          schools: {
            schoolUUID,
          },
        },
      });

      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async addJoinCode(payload: AddJoinCodeDTO, request: Request): Promise<JoinCode> {
    const { schoolUUID, joinCodeExpireTimestamp, joinCodeName } = payload;
    const jwt = await this.helper.extractJWTToken(request);
    const userUUID = await this.helper.getUserUUIDfromJWT(jwt);

    const schoolJoinCodes = await prisma.schoolJoinCodes.findMany({
      where: {
        schools: {
          schoolUUID,
        }
      },
    });

    if (schoolJoinCodes.length >= LENGTHS.MAX_JOIN_CODES) {
      throw new BadRequestException("Max join codes reached");
    }

    try {
      const joinCode = await prisma.schoolJoinCodes.create({
        data: {
          schools: {
            connect: {
              schoolUUID
            },
          },
          schoolJoinCodeName: joinCodeName,
          schoolJoinCode: await this.generateJoinCode(),
          schoolJoinCodeExpireTimestamp: new Date(joinCodeExpireTimestamp),
          users: {
            connect: {
              userUUID,
            },
          },
        },
        include: {
          users: true,
        }
      });

      return new JoinCode({
        ...joinCode,
        creator: new User(joinCode.users),
      });
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async removeJoinCode(payload: DeleteJoinCodeDTO, request: Request): Promise<number> {
    const { joinCode } = payload;

    try {
      await prisma.schoolJoinCodes.delete({
        where: {
          schoolJoinCode: joinCode,
        },
      });
      return 200;
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async updateJoinCode(payload: UpdateJoinCodeDTO, request: Request): Promise<JoinCode> {
    const { joinCode, joinCodeExpireTimestamp, joinCodeName } = payload;

    try {
      const schoolJoinCode = await prisma.schoolJoinCodes.update({
        where: {
          schoolJoinCode: joinCode,
        },
        data: {
          schoolJoinCodeName: joinCodeName,
          schoolJoinCodeExpireTimestamp: new Date(joinCodeExpireTimestamp),
        },
        include: {
          users: true,
        }
      });
      return new JoinCode({
        ...schoolJoinCode,
        creator: new User(schoolJoinCode.users),
      });
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getAllJoinCodes(schoolUUID: string, request: Request): Promise<JoinCode[] | JoinCode> {
    try {
      const joinCodes = await prisma.schoolJoinCodes.findMany({
        where: {
          schools: {
            schoolUUID,
          },
        },
        include: {
          users: true,
        }
      });

      return joinCodes.map((joinCode) => new JoinCode({
        ...joinCode,
        creator: new User(joinCode.users),
      }));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async generateJoinCode(): Promise<string> {
    let joinCode = nanoid().slice(8);
    const joinCodeExists = await prisma.schoolJoinCodes.findUnique({
      where: {
        schoolJoinCode: joinCode,
      },
    });

    if (!joinCodeExists) return joinCode;
    while (
      await !prisma.schoolJoinCodes.findUnique({
        where: {
          schoolJoinCode: joinCode,
        },
      })
    ) {
      joinCode = nanoid().slice(8);
    }
    return joinCode;
  }

  async getUserPermissions(body: UserPermissions): Promise<ReturnMessage> {
    const { personUUID } = body;
    if (!validator.isUUID(personUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const personRoles = await this.databaseService.getPersonRolesByPersonUUID(
      personUUID,
    );

    return {
      status: HttpStatus.OK,
      data: personRoles,
    };
  }

  async getUsersOfSchool(schoolUUID: string, request: Request): Promise<User[]> {
    try {
      const users = await prisma.schoolUsers.findMany({
        where: {
          schools: {
            schoolUUID,
          }
        },
        include: {
          schools: true,
          users: {
            include: {
              schoolUserRoles: {
                include: {
                  schoolRoles: true,
                }
              }
            }
          }
        }
      });

      return users.map((user) => new User({
        ...user.users,
        schoolRoleName: user.users.schoolUserRoles[0].schoolRoles.schoolRoleName,
      }));
    } catch {
      throw new InternalServerErrorException("Database error");
    }
  }

  async getSchoolInformation(
    schoolUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const school = await prisma.schools.findUnique({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        schoolName: true,
        schoolUUID: true,
        schoolDescription: true,
        schoolCreationTimestamp: true,
        schoolTimezone: true,
        schoolCreatorId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.schoolCreatorId,
    );

    const schoolDataItem = {
      schoolName: school.schoolName,
      schoolUUID: school.schoolUUID,
      schoolDescription: school.schoolDescription,
      schoolTimezone: school.schoolTimezone,
      schoolCreationTimestamp: school.schoolCreationTimestamp,
      creator: {
        userUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
      },
    };

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: schoolDataItem,
    };
  }

  async getDetailedSchoolInformation(
    schoolUUID: string,
    token: string,
  ): Promise<ReturnMessage> {
    if (!validator.isUUID(schoolUUID.slice(1), 4)) {
      return RETURN_DATA.INVALID_INPUT;
    }

    const schoolId = await this.databaseService.getSchoolIdByUUID(schoolUUID);

    const school = await prisma.schools.findUnique({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        schoolName: true,
        schoolUUID: true,
        schoolDescription: true,
        schoolCreationTimestamp: true,
        schoolTimezone: true,
        schoolCreatorId: true,
      },
    });

    if (!school) return RETURN_DATA.NOT_FOUND;

    const creator = await this.databaseService.getPersonById(
      school.schoolCreatorId,
    );

    const schoolData = {};

    const schoolDataItem = {
      schoolName: school.schoolName,
      schoolUUID: school.schoolUUID,
      schoolDescription: school.schoolDescription,
      schoolTimezone: school.schoolTimezone,
      schoolCreationTimestamp: school.schoolCreationTimestamp,
      creator: {
        userUUID: creator.personUUID,
        firstName: creator.firstName,
        lastName: creator.lastName,
      },
    };

    schoolData[schoolUUID] = schoolDataItem;

    const persons = await prisma.schoolUsers.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        schoolUserId: true,
      },
    });

    const personsData = [];
    for (const person of persons) {
      const personData = await this.databaseService.getPersonById(
        person.schoolUserId,
      );

      const personRole = await this.databaseService.getPersonRolesByPersonUUID(
        personData.personUUID,
      );

      personsData.push({
        personUUID: personData.personUUID,
        firstName: personData.firstName,
        lastName: personData.lastName,
        roleName: personRole[0].roleName,
        roleUUID: personRole[0].roleUUID,
      });
    }

    schoolData[schoolUUID].persons = personsData;

    const departmentData = [];

    const departments = await prisma.departments.findMany({
      where: {
        schoolId: Number(schoolId),
      },
      select: {
        departmentId: true,
        departmentUUID: true,
        departmentName: true,
      },
    });

    for (const department of departments) {
      const departmentDataItem = {
        departmentUUID: department.departmentUUID,
        departmentName: department.departmentName,
        classes: [],
      };

      const classes = await prisma.schoolClasses.findMany({
        where: {
          schoolClassDepartmentId: Number(department.departmentId),
        },
        select: {
          schoolClassId: true,
          schoolClassUUID: true,
          schoolClassName: true,
        },
      });

      if (!classes) departmentData.push(departmentDataItem);

      for (const classItem of classes) {
        const classDataItem = {
          classUUID: classItem.schoolClassUUID,
          className: classItem.schoolClassName,
        };

        departmentDataItem.classes.push(classDataItem);
        departmentData.push(departmentDataItem);
      }
    }

    schoolData[schoolUUID].departments = departmentData;

    const coursesData = [];

    const courses = await prisma.courses.findMany({
      where: {
        courseSchoolId: Number(schoolId),
      },
      select: {
        courseId: true,
        courseUUID: true,
        courseName: true,
        courseDescription: true,
        courseCreationTimestamp: true,
        courseCreatorId: true,
      },
    });

    for (const course of courses) {
      const creator = await this.databaseService.getPersonById(
        course.courseCreatorId,
      );

      const courseDataItem = {
        courseName: course.courseName,
        courseUUID: course.courseUUID,
        courseDescription: course.courseDescription,
        courseCreationTimestamp: course.courseCreationTimestamp,
        creator: {
          userUUID: creator.personUUID,
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
        persons: [],
      };

      const coursePersons = await prisma.courseUsers.findMany({
        where: {
          courseId: Number(course.courseId),
        },
        select: {
          userId: true,
        },
      });

      for (const coursePerson of coursePersons) {
        const coursePersonData = await this.databaseService.getPersonById(
          coursePerson.userId,
        );

        const coursePersonItem = {
          personUUID: coursePersonData.personUUID,
          firstName: coursePersonData.firstName,
          lastName: coursePersonData.lastName,
        };

        courseDataItem.persons.push(coursePersonItem);
      }
      coursesData.push(courseDataItem);
    }

    schoolData[schoolUUID].courses = coursesData;

    return {
      status: RETURN_DATA.SUCCESS.status,
      data: schoolData,
    };
  }

  async updateRole(request): Promise<ReturnMessage> {
    const { personUUID, schoolUUID, roleId } = request.body;

    try {
      const personId = await this.helper.getUserIdByUUID(personUUID);
      const schoolId = await this.helper.getSchoolIdByUUID(schoolUUID);
      await prisma.schoolUserRoles.update({
        where: {
          user_school_unique: {
            userId: Number(personId),
            schoolId: Number(schoolId),
          },
        },
        data: {
          schoolRoleId: Number(roleId),
        },
      });
      return RETURN_DATA.SUCCESS;
    } catch (error) {
      console.log(error);
      return RETURN_DATA.DATABASE_ERROR;
    }
  }

  toBoolean(value): boolean {
    return value === '1';
  }
}
