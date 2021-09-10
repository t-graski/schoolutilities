import { Injectable } from '@nestjs/common';
import {
  Server,
  serverTable,
  classTable,
  timeTableEntryTable,
  subjectTable,
} from './server';
import {
  getServerByGuildId,
  getClassById,
  getTimeTableEntriesByClassId,
  getSubjectById,
} from './utils';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
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
    timeTable: [],
  };
  let servers: serverTable[] = await getServerByGuildId(guild_id);
  for (let server of servers) {
    serverJson.guildId = server.guild_id;
    serverJson.name = server.name;
    serverJson.language = server.language;
    serverJson.timeZone = server.timezone;
    let classes: classTable[] = await getClassById(server.server_id);
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
        if (serverJson.timeTable[timeTableEntry.weekday - 1] == undefined) {
          serverJson.timeTable[timeTableEntry.weekday - 1] = [];
        }
        let subjects = await getSubjectById(timeTableEntry.subject_id);
        serverJson.timeTable[timeTableEntry.weekday - 1].push({
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
    }
  }
  return serverJson;
}
