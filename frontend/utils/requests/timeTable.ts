import { fetchData } from "./default";

export async function getTimeTableElement(timeTableElementUUID: string) {
  return fetchData("timetable/element" + timeTableElementUUID, "GET", 200);
}

export async function getExams(schoolUUID: string) {
  return fetchData("timetable/exams/" + schoolUUID, "GET", 200);
}

export async function addExam(exam: any) {
  return fetchData("timetable/exam", "POST", 200, exam);
}

export async function deleteExam(examUUID: string) {
  return fetchData("timetable/exam/" + examUUID, "DELETE", 200);
}

export async function editExam(exam: any) {
  console.log(exam);
  return fetchData("timetable/exam", "PUT", 200, exam);
}
