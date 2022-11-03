import { fetchData } from "./default";

export async function fetchSchoolSubjects(
  schoolUUID: string
): Promise<any> {
  return fetchData("schoolAdmin/subjects/" + schoolUUID, "GET", 200);
}

export async function addSchoolSubject(subject: any): Promise<any> {
  console.log(subject);
  return fetchData("schoolAdmin/subject/", "POST", 200, subject);
}

export async function deleteSchoolSubject(subjectUUID: string): Promise<any> {
  return fetchData("schoolAdmin/subject/" + subjectUUID, "DELETE", 200);
}

export async function editSchoolSubject(
  subject: any
): Promise<any> {
  return fetchData("schoolAdmin/subject/", "PUT", 200, subject);
}

export async function fetchSchoolRooms(
  schoolUUID: string
): Promise<any> {
  return fetchData("schoolAdmin/rooms/" + schoolUUID, "GET", 200);
}

export async function addSchoolRoom(room: any): Promise<any> {
  return fetchData("schoolAdmin/room/", "POST", 200, room);
}

export async function deleteSchoolRoom(roomUUID: string): Promise<any> {
  return fetchData("schoolAdmin/room/" + roomUUID, "DELETE", 200);
}

export async function editSchoolRoom(
  room: any
): Promise<any> {
  return fetchData("schoolAdmin/room/", "PUT", 200, room);
}