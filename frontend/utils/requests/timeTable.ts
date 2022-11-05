import { fetchData } from "./default";

export async function getTimeTableElement(timeTableElementUUID: string) {
  return fetchData(
    "timetable/timetableelement/" + timeTableElementUUID,
    "GET",
    200
  );
}

export async function getTimeTableElementDetailed(
  timeTableElementUUID: string,
  startDate: string
) {
  return fetchData(
    "timetable/element/detailed/" + timeTableElementUUID + "/" + startDate,
    "GET",
    200
  );
}

export async function getExams(schoolUUID: string) {
  return fetchData("timetable/exams/" + schoolUUID, "GET", 200);
}

export async function addExam(exam: any) {
  return fetchData("timetable/exam", "POST", 201, exam);
}

export async function deleteExam(examUUID: string) {
  return fetchData("timetable/exam/" + examUUID, "DELETE", 200);
}

export async function editExam(exam: any) {
  console.log(exam);
  return fetchData("timetable/exam", "PUT", 200, exam);
}

export async function addTimeTableElement(timeTableElement: any) {
  console.log(timeTableElement);
  return fetchData("timetable/element", "POST", 201, timeTableElement);
}

export async function editTimeTableElement(timeTableElement: any) {
  console.log(timeTableElement);
  return fetchData("timetable/element", "PUT", 201, timeTableElement);
}

export async function deleteTimeTableElement(timeTableElementUUID: string) {
  return fetchData("timetable/element/" + timeTableElementUUID, "DELETE", 200);
}

export async function omitTimeTableElement(timeTableOmitInformation: object) {
  return fetchData("timetable/omit", "POST", 200, timeTableOmitInformation);
}

export async function deleteOmitTimeTableElement(timeTableElementUUID: string) {
  return fetchData("timetable/omit/" + timeTableElementUUID, "DELETE", 200);
}

export async function editTimeTableItemSubstitution(timeTableElement) {
  console.log(timeTableElement);
  return fetchData("timetable/substitution/", "POST", 200, timeTableElement);
}

export async function getTimeTableItemSubstitution(
  timeTableElementUUID: string,
  startDate: string
) {
  return fetchData(
    "timetable/substitution/" + timeTableElementUUID + "/" + startDate,
    "GET",
    200
  );
}

export async function deleteTimeTableItemSubstitution(
  timeTableSubstitutionUUID: string
) {
  return fetchData(
    "timetable/substitution/" + timeTableSubstitutionUUID,
    "DELETE",
    200
  );
}
