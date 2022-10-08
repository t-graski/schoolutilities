import { fetchData } from "./default";

export async function getTimeTableElement(timeTableElementUUID: string) {
  return fetchData("timetable/element" + timeTableElementUUID, "GET", 200);
}
