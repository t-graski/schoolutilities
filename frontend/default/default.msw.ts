/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * SchoolUtilities API
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getMailControllerGetMailsSentToUserMock = () =>
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({}));

export const getCourseControllerAddCourseMock = () => ({
  courseUUID: faker.random.word(),
  courseName: faker.random.word(),
  courseDescription: faker.random.word(),
  school: {
    courses: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      courseUUID: faker.random.word(),
      courseName: faker.random.word(),
      courseDescription: faker.random.word(),
      schoolSubject: {
        schoolSubjectUUID: faker.random.word(),
        schoolSubjectName: faker.random.word(),
        schoolSubjectAbbreviation: faker.random.word(),
        timeTableElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
      },
      courseCreationTimestamp: `${
        faker.date.past().toISOString().split(".")[0]
      }Z`,
      creator: {
        userUUID: faker.random.word(),
        userFirstname: faker.random.word(),
        userLastname: faker.random.word(),
        userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
        userEmail: faker.random.word(),
        userEmailVerified: faker.datatype.boolean(),
        userCreationTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        userLastLoginTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        articles: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        courseElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissionGrades: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissions: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schools: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        userSettings: {},
        timeTableElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schoolRoleName: faker.random.word(),
      },
      canEdit: faker.datatype.boolean(),
      courseUsers: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({
        userUUID: faker.random.word(),
        userFirstname: faker.random.word(),
        userLastname: faker.random.word(),
        userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
        userEmail: faker.random.word(),
        userEmailVerified: faker.datatype.boolean(),
        userCreationTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        userLastLoginTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        articles: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        courseElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissionGrades: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissions: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schools: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        userSettings: {},
        timeTableElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schoolRoleName: faker.random.word(),
      })),
      courseClasses: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
      courseElements: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
      courseGrades: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
    })),
    departments: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({})),
    schoolJoinCodes: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({})),
    schoolUsers: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      userUUID: faker.random.word(),
      userFirstname: faker.random.word(),
      userLastname: faker.random.word(),
      userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
      userEmail: faker.random.word(),
      userEmailVerified: faker.datatype.boolean(),
      userCreationTimestamp: `${
        faker.date.past().toISOString().split(".")[0]
      }Z`,
      userLastLoginTimestamp: `${
        faker.date.past().toISOString().split(".")[0]
      }Z`,
      articles: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      courseElements: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      fileSubmissionGrades: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      fileSubmissions: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      courses: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      schools: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      userSettings: {},
      timeTableElements: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => faker.random.word()),
      schoolRoleName: faker.random.word(),
    })),
    schoolRooms: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      timeTableExamRoomUUID: faker.random.word(),
      schoolRoomName: faker.random.word(),
      schoolRoomAbbreviation: faker.random.word(),
      schoolRoomBuilding: faker.random.word(),
    })),
    schoolSubjects: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      schoolSubjectUUID: faker.random.word(),
      schoolSubjectName: faker.random.word(),
      schoolSubjectAbbreviation: faker.random.word(),
      courses: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({
        courseUUID: faker.random.word(),
        courseName: faker.random.word(),
        courseDescription: faker.random.word(),
        schoolSubject: {
          schoolSubjectUUID: faker.random.word(),
          schoolSubjectName: faker.random.word(),
          schoolSubjectAbbreviation: faker.random.word(),
          timeTableElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => ({})),
        },
        courseCreationTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        creator: {
          userUUID: faker.random.word(),
          userFirstname: faker.random.word(),
          userLastname: faker.random.word(),
          userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
          userEmail: faker.random.word(),
          userEmailVerified: faker.datatype.boolean(),
          userCreationTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          userLastLoginTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          articles: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          courseElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissionGrades: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissions: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schools: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          userSettings: {},
          timeTableElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schoolRoleName: faker.random.word(),
        },
        canEdit: faker.datatype.boolean(),
        courseUsers: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({
          userUUID: faker.random.word(),
          userFirstname: faker.random.word(),
          userLastname: faker.random.word(),
          userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
          userEmail: faker.random.word(),
          userEmailVerified: faker.datatype.boolean(),
          userCreationTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          userLastLoginTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          articles: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          courseElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissionGrades: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissions: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schools: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          userSettings: {},
          timeTableElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schoolRoleName: faker.random.word(),
        })),
        courseClasses: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
        courseElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
        courseGrades: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
      })),
      timeTableElements: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
    })),
  },
  schoolSubject: {
    schoolSubjectUUID: faker.random.word(),
    schoolSubjectName: faker.random.word(),
    schoolSubjectAbbreviation: faker.random.word(),
    courses: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      courseUUID: faker.random.word(),
      courseName: faker.random.word(),
      courseDescription: faker.random.word(),
      school: {
        departments: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
        schoolJoinCodes: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({})),
        schoolUsers: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({
          userUUID: faker.random.word(),
          userFirstname: faker.random.word(),
          userLastname: faker.random.word(),
          userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
          userEmail: faker.random.word(),
          userEmailVerified: faker.datatype.boolean(),
          userCreationTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          userLastLoginTimestamp: `${
            faker.date.past().toISOString().split(".")[0]
          }Z`,
          articles: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          courseElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissionGrades: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          fileSubmissions: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schools: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          userSettings: {},
          timeTableElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => faker.random.word()),
          schoolRoleName: faker.random.word(),
        })),
        schoolRooms: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({
          timeTableExamRoomUUID: faker.random.word(),
          schoolRoomName: faker.random.word(),
          schoolRoomAbbreviation: faker.random.word(),
          schoolRoomBuilding: faker.random.word(),
        })),
        schoolSubjects: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => ({
          schoolSubjectUUID: faker.random.word(),
          schoolSubjectName: faker.random.word(),
          schoolSubjectAbbreviation: faker.random.word(),
          timeTableElements: Array.from(
            { length: faker.datatype.number({ min: 1, max: 10 }) },
            (_, i) => i + 1
          ).map(() => ({})),
        })),
      },
      courseCreationTimestamp: `${
        faker.date.past().toISOString().split(".")[0]
      }Z`,
      creator: {
        userUUID: faker.random.word(),
        userFirstname: faker.random.word(),
        userLastname: faker.random.word(),
        userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
        userEmail: faker.random.word(),
        userEmailVerified: faker.datatype.boolean(),
        userCreationTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        userLastLoginTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        articles: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        courseElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissionGrades: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissions: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schools: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        userSettings: {},
        timeTableElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schoolRoleName: faker.random.word(),
      },
      canEdit: faker.datatype.boolean(),
      courseUsers: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({
        userUUID: faker.random.word(),
        userFirstname: faker.random.word(),
        userLastname: faker.random.word(),
        userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
        userEmail: faker.random.word(),
        userEmailVerified: faker.datatype.boolean(),
        userCreationTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        userLastLoginTimestamp: `${
          faker.date.past().toISOString().split(".")[0]
        }Z`,
        articles: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        courseElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissionGrades: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        fileSubmissions: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schools: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        userSettings: {},
        timeTableElements: Array.from(
          { length: faker.datatype.number({ min: 1, max: 10 }) },
          (_, i) => i + 1
        ).map(() => faker.random.word()),
        schoolRoleName: faker.random.word(),
      })),
      courseClasses: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
      courseElements: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
      courseGrades: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        (_, i) => i + 1
      ).map(() => ({})),
    })),
    timeTableElements: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({})),
  },
  courseCreationTimestamp: `${faker.date.past().toISOString().split(".")[0]}Z`,
  creator: {
    userUUID: faker.random.word(),
    userFirstname: faker.random.word(),
    userLastname: faker.random.word(),
    userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
    userEmail: faker.random.word(),
    userEmailVerified: faker.datatype.boolean(),
    userCreationTimestamp: `${faker.date.past().toISOString().split(".")[0]}Z`,
    userLastLoginTimestamp: `${faker.date.past().toISOString().split(".")[0]}Z`,
    articles: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    courseElements: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    fileSubmissionGrades: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    fileSubmissions: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    courses: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    schools: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    userSettings: {},
    timeTableElements: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    schoolRoleName: faker.random.word(),
  },
  canEdit: faker.datatype.boolean(),
  courseUsers: Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    userUUID: faker.random.word(),
    userFirstname: faker.random.word(),
    userLastname: faker.random.word(),
    userBirthDate: `${faker.date.past().toISOString().split(".")[0]}Z`,
    userEmail: faker.random.word(),
    userEmailVerified: faker.datatype.boolean(),
    userCreationTimestamp: `${faker.date.past().toISOString().split(".")[0]}Z`,
    userLastLoginTimestamp: `${faker.date.past().toISOString().split(".")[0]}Z`,
    articles: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    courseElements: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    fileSubmissionGrades: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    fileSubmissions: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    courses: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    schools: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    userSettings: {},
    timeTableElements: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => faker.random.word()),
    schoolRoleName: faker.random.word(),
  })),
  courseClasses: Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({})),
  courseElements: Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({})),
  courseGrades: Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({})),
});

export const getTimetableControllerAddHolidayMock = () => ({
  holidayUUID: faker.random.word(),
  holidayName: faker.random.word(),
  holidayStartDate: faker.random.word(),
  holidayEndDate: faker.random.word(),
});

export const getTimetableControllerUpdateHolidayMock = () => ({
  holidayUUID: faker.random.word(),
  holidayName: faker.random.word(),
  holidayStartDate: faker.random.word(),
  holidayEndDate: faker.random.word(),
});

export const getTimetableControllerGetHolidayMock = () =>
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    holidayUUID: faker.random.word(),
    holidayName: faker.random.word(),
    holidayStartDate: faker.random.word(),
    holidayEndDate: faker.random.word(),
  }));

export const getTimetableControllerRemoveHolidayMock = () =>
  faker.datatype.number().toString();

export const getDefaultMSW = () => [
  rest.get("*/api/assets/logos/:logoname", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/assets/images/:filename", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/assets/submissions/:fileUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/assets/list/logo", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/assets/list/images", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/register", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/login", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/link", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/unlink", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/mobile/login", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/auth/profile", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/auth/refresh", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/auth/roles", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/mail/getUserMails", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getMailControllerGetMailsSentToUserMock())
    );
  }),
  rest.post("*/api/course", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getCourseControllerAddCourseMock())
    );
  }),
  rest.delete("*/api/course", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/course", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/course/user", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.delete("*/api/course/user", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/course/courses/:schoolUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/course/submissions/:elementUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/course/info/:courseUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/course/courseElements", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/course/courseElements/:courseUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/course/submitExercise", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/course/element/:elementUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/course/revertExercise/:elementUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/courseFile", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/courseFile/getFileUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/courseFile/getFileInfo", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/courseFile/getFile", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/status", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timetable", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timetable/element", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/timetable/element", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get(
    "*/api/timetable/element/detailed/:elementUUID/:date",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }
  ),
  rest.delete("*/api/timetable/element/:elementUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get(
    "*/api/timetable/timeTableElement/:timeTableElementUUID",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }
  ),
  rest.post("*/api/timetable/holiday", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getTimetableControllerAddHolidayMock())
    );
  }),
  rest.put("*/api/timetable/holiday", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getTimetableControllerUpdateHolidayMock())
    );
  }),
  rest.get("*/api/timetable/holiday/:schoolUUID", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getTimetableControllerGetHolidayMock())
    );
  }),
  rest.delete("*/api/timetable/holiday/:holidayUUID", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getTimetableControllerRemoveHolidayMock())
    );
  }),
  rest.post("*/api/timetable/grid", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/timetable/grid", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timetable/omit", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.delete(
    "*/api/timetable/omit/:timeTableElementUUID",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }
  ),
  rest.delete("*/api/timetable/grid/:schoolUUId", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/grid/:schoolUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.delete("*/api/timetable/grid/break", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/timetable/grid/break", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timetable/grid/break", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/freeRooms", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timetable/substitution", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/timetable/substitution", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/substitution/:elementUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.delete(
    "*/api/timetable/substitution/:substitutionUUID",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }
  ),
  rest.post("*/api/timetable/exam", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.put("*/api/timetable/exam", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/exam", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/exam/:examUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.delete("*/api/timetable/exam/:examUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get("*/api/timetable/exams/:schoolUUID", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.get(
    "*/api/timetable/timetable/:classUUID/:dateString",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }
  ),
  rest.post("*/api/timezone/importTimezones", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/timezone/getTimezoneByName", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/untis", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/user/register", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
  rest.post("*/api/user/activateAccount", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
];
