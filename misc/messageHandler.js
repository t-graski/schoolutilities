const { deleteTimeEntry, getTimeTableString, convertTimeEntryToObject, isTimeOverlaped, getWeekDay, save } = require('utils.js');
let configData;
let isFirstConfig = false;
const datastorePath = './datastore/configs.json';
try {
    configData = require('../datastore/configs.json');
} catch (error) {
    configData = [];
    isFirstConfig = true;
}

function messageHandler(message, args) {
    let serverArrayId;
    try {
        if (
            !configData.find((configData, index) => {
                serverArrayId = index;
                return configData.guildId == message.guild.id;
            })
        ) {
            configData.push({
                guildId: message.guild.id,
                name: message.guild.name,
                studentId: 0,
                teacherId: 0,
                timeZone: 'gmt+0',
                language: 'english',
                channel: 'bot-config',
                notifications: false,
                checktime: 3,
                autocheck: false,
                timeTable: {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                    6: [],
                    7: [],
                },
            });
            serverArrayId = configData.length - 1;
        }
    } catch (error) {
        console.log(error);
    }
    let replyMsg = '';
    if (isFirstConfig) {
        replyMsg = "Hi, nice to have you in the schoolutilities community. That's your first configuration, have fun with this bot!\n";
        isFirstConfig = false;
    }
    let configInput = args[0].toLowerCase();
    if (configInput == 'student') {
        let inputRole = args.slice(1).reduce((a, b) => a + ' ' + b);
        configData[serverArrayId].studentId = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === inputRole.toLowerCase()
        ).id;
        replyMsg += `Your student role has been updated.`;
    } else if (configInput == 'teacher') {
        let inputRole = args.slice(1).reduce((a, b) => a + ' ' + b);
        configData[serverArrayId].teacherId = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === inputRole.toLowerCase()
        ).id;
        replyMsg += `Your teacher role has been updated.`;
    } else if (configInput == 'notifications') {
        if (args[1].toLowerCase() == 'enable') {
            configData[serverArrayId].notifications = true;
            replyMsg += `Your notification has been enabled`;
        } else if (args[1].toLowerCase() == 'disable') {
            configData[serverArrayId].notifications = false;
            replyMsg += `Your notification has been disabled`;
        } else {
            replyMsg += `Please enter a valid argument (For more informations, check the documentary with .help)`;
        }
    } else if (configInput == 'timezone') {
        configData[serverArrayId].timeZone = args[1].toLowerCase();
        replyMsg += `Your timezone has been updated.`;
    } else if (configInput == 'language') {
        configData[serverArrayId].language = args[1].toLowerCase();
        replyMsg += `Your language has been updated.`;
    } else if (configInput == 'checktime') {
        configData[serverArrayId].checktime = args[1];
        replyMsg += `Your checktime has been updated.`;
    } else if (configInput == 'autocheck') {
        if (args[1].toLowerCase() == 'enable') {
            configData[serverArrayId].autocheck = true;
            replyMsg += `Your autocheck has been enabled.`;
        } else if (args[1].toLowerCase() == 'disable') {
            configData[serverArrayId].autocheck = false;
            replyMsg += `Your autocheck has been disabled.`;
        } else {
            replyMsg += `Please enter a valid argument (For more informations, check the documentary with .help)`;
        }
    } else if (configInput == 'timetable') {
        if (args[1].toLowerCase() == 'add') {
            //Check the weekday for the timetable entry
            let weekday = getWeekDay(args[2]);

            //Check if time is correct
            let subject = args.length > 0 ? args.slice(6).reduce((a, b) => a + ' ' + b) : args[6];
            let dateEntry = convertTimeEntryToObject(args[3], args[4], args[5], subject, message);
            if (typeof dateEntry == 'object' && typeof weekday == 'number') {
                configData[serverArrayId].timeTable[weekday].push(dateEntry);
                replyMsg += 'Edited timetable';
                if (isTimeOverlaped(dateEntry, configData[serverArrayId].timeTable[weekday])) {
                    replyMsg +=
                        '\n**Warning**: Your time entry overlapes with another one, if you want to remove the entry, please use remove. (For more informations type .help)';
                }
            } else {
                // console.log("Something went wrong!");
                if (typeof dateEntry == 'object') {
                    replyMsg += weekday;
                } else {
                    replyMsg += dateEntry;
                }
            }
        } else if (args[1].toLowerCase() == 'remove') {
            //Check the weekday for the timetable entry
            let weekday = getWeekDay(args[2]);

            //Check if time is correct
            let subject = args.slice(6).reduce((a, b) => a + ' ' + b);
            let dateEntry = convertTimeEntryToObject(args[3], args[4], args[5], subject, message);
            let isDeleted = deleteTimeEntry(dateEntry, weekday, configData, serverArrayId);
            if (isDeleted == true) {
                replyMsg += `The subject has been deleted!`;
            } else {
                replyMsg += isDeleted;
            }
        } else if (args[1].toLowerCase() == 'clear') {
            if (args[2]) {
                let weekday = getWeekDay(args[2]);
                if (typeof weekday == 'number') {
                    configData[serverArrayId].timeTable[weekday] = [];
                    replyMsg += `The day has been wiped.`;
                } else {
                    replyMsg += `Please enter a valid weekday.`;
                }
            } else {
                configData[serverArrayId].timeTable = {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                    6: [],
                    7: [],
                };
                replyMsg += `The entire timetable has been wiped.`;
            }
        } else if (args[1].toLowerCase() == 'print') {
            replyMsg += getTimeTableString(configData[serverArrayId].timeTable, configData[serverArrayId].timeZone);
        } else {
            replyMsg += 'The command ' + args[1] + " doesn't exist.";
        }
    } else {
        replyMsg += `There was a problem updating your config, please check, if you've written it correctly.`;
    }
    message.channel.send(replyMsg);
    save(datastorePath, JSON.stringify(configData, null, '\t'));
}

module.exports.messageHandler = messageHandler;
