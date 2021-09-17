import { Injectable } from '@nestjs/common';
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
  UserServerInfo,
  UserServerInfoList,
} from './server';
import {
  getServerByGuildId,
  getClassById,
  getTimeTableEntriesByClassId,
  getSubjectById,
  updateServer,
  updateClass,
  updateTimetableEntry,
  getServerIdByGuildId,
} from './utils';
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

    for( let discordServer of discordServers ) {
      let server: number[] = await getServerIdByGuildId(discordServer.id);
      if(discordServer.permissions == 2147483647){
        if(server.length > 0){
          serverList.sharedAdminServer.push(discordServer);
        }else{
          serverList.adminServer.push(discordServer);
        }
      }else if(server.length > 0){
        serverList.sharedServer.push(discordServer);
      }
    }
    serverList.sharedAdminServer.sort((a, b) => a.name.localeCompare(b.name));
    serverList.sharedServer.sort((a, b) => a.name.localeCompare(b.name));
    serverList.adminServer.sort((a, b) => a.name.localeCompare(b.name));
    return serverList;
  }

  async getServerJson(guild_id: string, token: string): Promise<Server> {
    let discordRes = await fetch('https://discord.com/api/users/@me/guilds', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let discordServers = await discordRes.json();
    // @ts-ignore
    for (let discordServer of discordServers) {
      if (discordServer.id === guild_id) {
        console.log(discordServer.id + ' ' + guild_id);
        return await getServerJsonByGuildId(guild_id);
      }
    }
    throw new Error('Server not found');
  }

  async saveServerJson(serverJson: Server, token: string): Promise<boolean> {
    let discordRes = await fetch('https://discord.com/api/users/@me/guilds', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let discordServers = await discordRes.json();
    // @ts-ignore
    for (let discordServer of discordServers) {
      if (discordServer.id === serverJson.guildId) {
        return await saveSettings(serverJson);
      }
    }
    throw new Error('Server not found');
  }

  async saveTimetableJson(timetableJson: Server["classTimeTable"], guildId, token: string): Promise<boolean> {
    let discordRes = await fetch('https://discord.com/api/users/@me/guilds', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let discordServers = await discordRes.json();
    // @ts-ignore
    for (let discordServer of discordServers) {
      if (discordServer.id === guildId) {
        return await saveTimetable(timetableJson);
      }
    }
    throw new Error('Server not found');
  }
}

async function saveTimetable(timetableJson: Server["classTimeTable"]): Promise<boolean> {   
  // let classId = timetableJson.classId;
  // for (let weekday in config.timeTable) {
  //     let timeTable = config.timeTable[weekday];
  //     for (let time of timeTable) {
  //         await updateTimetableEntry({
  //             class_id: classId,
  //             weekday: weekday,
  //             start_time: `${time.startTime.hours}:${time.startTime.minutes}`,
  //             end_time: `${time.endTime.hours}:${time.endTime.minutes}`,
  //             channel: time.channel,
  //             subject_name: time.subject,
  //         });
  //     }
  // }
  return true;
}

async function saveSettings(serverJson: Server): Promise<boolean> {   
  let server = await updateServer({
      guild_id: serverJson.guildId,
      name: serverJson.name,
      language: serverJson.language,
      timezone: serverJson.timeZone,
  });
  let server_id = await getServerIdByGuildId(serverJson.guildId)
  //@ts-ignore
  let schoolclass = await updateClass({
      student_id: serverJson.studentId,
      teacher_id: serverJson.teacherId,
      checktime: serverJson.checktime,
      autocheck: serverJson.autocheck,
      notifications: serverJson.notifications,
      //@ts-ignore
      server_id: server_id[0].server_id,
  });
  return true;
}

async function getServerJsonByGuildId(guild_id): Promise<Server> {
  let serverJson: Server = {
    guildId: guild_id,
    name: '',
    studentId: '',
    teacherId: '',
    timeZone: '',
    language: '',
    checktime: 1,
    autocheck: false,
    notifications: false,
    classTimeTable: [],
  };
  let servers: serverTable[] = await getServerByGuildId(guild_id);
  for (let server of servers) {
    serverJson.guildId = server.guild_id;
    serverJson.name = server.name;
    serverJson.language = server.language;
    serverJson.timeZone = server.timezone;
    let classes: classTable[] = await getClassById(server.server_id);
    let i = 0;
    for (let schoolclass of classes) {
      serverJson.studentId = schoolclass.student_id;
      serverJson.teacherId = schoolclass.teacher_id;
      serverJson.checktime = schoolclass.checktime;
      serverJson.autocheck = schoolclass.autocheck == 1 ? true : false;
      serverJson.notifications = schoolclass.notifications == 1 ? true : false;
      let timeTableEntries: timeTableEntryTable[] =
        await getTimeTableEntriesByClassId(schoolclass.class_id);
      for (let timeTableEntry of timeTableEntries) {
        let startTimeData = timeTableEntry.starttime.split(':');
        let endTimeData = timeTableEntry.endtime.split(':');
        if (serverJson.classTimeTable[timeTableEntry.weekday - 1] == undefined) {
          serverJson.classTimeTable[timeTableEntry.weekday - 1] = [];
        }
        let subjects = await getSubjectById(timeTableEntry.subject_id);
        serverJson.classTimeTable[timeTableEntry.weekday - 1].push({
          classId: schoolclass.class_id,
          channel: timeTableEntry.channel_id,
          subject: subjects[0].subject_name,
          startTime: {
            hours: parseInt(startTimeData[0]),
            minutes: parseInt(startTimeData[1]),
          },
          endTime: {
            hours: parseInt(endTimeData[0]),
            minutes: parseInt(endTimeData[1]),
          },
        });
      }
      i++;
    }
  }
  return serverJson;
}
