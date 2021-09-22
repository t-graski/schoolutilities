import { Injectable } from '@nestjs/common';
import { UserServerInfoList } from './server';
import { getServerIdByGuildId } from './utils';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  //@ts-ignore
  async getServerList(token: string): Promise<UserServerInfoList> {
    let discordRes = await fetch('https://discord.com/api/users/@me/guilds', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let discordServers = await discordRes.json();
    let serverList: UserServerInfoList = {
      sharedAdminServer: [],
      sharedServer: [],
      adminServer: [],
    };

    for (let discordServer of discordServers) {
      let server: number[] = await getServerIdByGuildId(discordServer.id);
      if (discordServer.permissions == 2147483647) {
        if (server.length > 0) {
          serverList.sharedAdminServer.push(discordServer);
        } else {
          serverList.adminServer.push(discordServer);
        }
      } else if (server.length > 0) {
        serverList.sharedServer.push(discordServer);
      }
    }
    serverList.sharedAdminServer.sort((a, b) => a.name.localeCompare(b.name));
    serverList.sharedServer.sort((a, b) => a.name.localeCompare(b.name));
    serverList.adminServer.sort((a, b) => a.name.localeCompare(b.name));
    return serverList;
  }
}
