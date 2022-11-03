/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * SchoolUtilities API
 * OpenAPI spec version: 1.0
 */
import type { School } from "./school";

export interface SchoolRoom {
  /** The UUID of the school room */
  timeTableExamRoomUUID: string;
  /** The name of the school room */
  schoolRoomName: string;
  /** The abbreviation of the school room */
  schoolRoomAbbreviation: string;
  /** The building of the school room */
  schoolRoomBuilding: string;
  /** The school of the school room */
  school: School;
}
