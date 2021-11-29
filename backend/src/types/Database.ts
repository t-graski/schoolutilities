export interface DatabaseUpdate {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

export interface ReturnMessage {
  status: number;
  message?: string;
  data?: string | Object;
}
