export interface UserServerInfo {
  id: string;
  name: string;
  icon: string;
  owner: string;
  permissions: string;
  features: string[];
  permissions_new: string;
}

export interface UserServerInfoList {
    sharedAdminServer: UserServerInfo[],
    sharedServer: UserServerInfo[],
    adminServer: UserServerInfo[],
}