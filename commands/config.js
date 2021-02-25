const fs = require('fs');
const datastorePath = './datastore/configs.json';
const numeral = require('numeral');
let configData;
let isFirstConfig = false;
try {
    configData = require('../datastore/configs.json');
} catch (error) {
    configData = [];
    isFirstConfig = true;
}

exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.channel.name == 'bot-config') {
            let serverArrayId;
            try {
                // Refactor <-- works, but it's ugly
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
                        prefix: '.',
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
                replyMsg =
                    "Hi, nice to have you in the schoolutilities community. That's your first configuration, have fun with this bot!\nConsider to type \".help\"!";
                isFirstConfig = false;
            }
            let configInput = args[0].toLowerCase();
            if (configInput == 'student') {
                let inputRole = args.slice(1).reduce((a, b) => a + ' ' + b);
                configData[serverArrayId].studentId = message.guild.roles.cache.find(
                    (role) => role.name.toLowerCase() === inputRole.toLowerCase()
                ).id;
                replyMsg += `Your student role has been updated.`;
            } else if (configInput == 'prefix') {
                configData[serverArrayId].prefix = args[1];
                replyMsg += `Prefix has been updated to ${args[1]}`;
            }  else if (configInput == 'teacher') {
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
                if(args[1].toUpperCase().startsWith("GMT")) {
                    configData[serverArrayId].timeZone = args[1].toLowerCase();
                    replyMsg += `Your timezone has been updated.`;
                } else {
                    replyMsg += `The given timezone is not correct. Maybe it does not start with GMT? :thinking:`;
                }
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
                try {
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
                } else {
                    replyMsg += 'The command ' + args[1] + " doesn't exist.";
                }
            }catch(IllegalArgumentException) {
                replyMsg += `There was a problem updating your config, please check, if you've written it correctly.\nMake sure you follow the pattern: ".config timetable [add/remove] [Mo/Tu/We/Th/Fr/Sa/Su] [start Time (10:00)] [end Time(12:00)] [#channel] [subject name].`;
            }
            } else {
                replyMsg += `There was a problem updating your config, please check, if you've written it correctly.\nMake sure you follow the pattern: ".config timetable [add/remove] [Mo/Tu/We/Th/Fr/Sa/Su] [start Time (10:00)] [end Time(12:00)] [#channel] [subject name].`;
            }
            message.channel.send(replyMsg);
            save(datastorePath, JSON.stringify(configData, null, '\t'));
        }
    }
};
function save(path, string) {
    fs.writeFile(path, string, (err) => {
        console.log(err ? err : '');
    });
}

function checkTime(timeString) {
    let hours = timeString.split(':')[0];
    let minutes = timeString.split(':')[1];

    if (hours < 24 && hours >= 0 && minutes < 60 && minutes >= 0) {
        let date = {
            hours: Number(hours),
            minutes: Number(minutes),
        };
        return date;
    } else {
        return false;
    }
}

function deleteTimeEntry(dateEntry, weekday, configData, serverArrayId) {
    let deleteIndex = false;
    configData[serverArrayId].timeTable[weekday].find((timeEntry, index) => {
        if (isSameEntry(timeEntry, dateEntry)) {
            deleteIndex = index;
        }
    });

    if (deleteIndex != false) {
        configData[serverArrayId].timeTable[weekday].splice(deleteIndex, 1);
        return true;
    } else {
        return dateEntry;
    }
}

function checkTimesMatching(startTime, endTime) {
    return (startTime.hours == endTime.hours && startTime.minutes < endTime.minutes) || startTime.hours < endTime.hours;
}

function convertTimeEntryToObject(startTime, endTime, channel, subjectName, message) {
    let replyMsg = '';
    channel = channel.replace(/\D/g, '');
    startTime = checkTime(startTime);
    endTime = checkTime(endTime);

    if (
        startTime != false &&
        endTime != false &&
        checkTimesMatching(startTime, endTime) &&
        subjectName.length > 1 &&
        subjectName.length < 30 &&
        message.guild.channels.cache.get(channel)
    ) {
        replyMsg = {
            startTime: startTime,
            endTime: endTime,
            subject: subjectName,
            channel: channel,
        };
    } else if (startTime == false) {
        replyMsg +=
            'Your start time was incorrect, please enter a valid time. Look up in the documentation with .help for more informations.';
    } else if (endTime == false) {
        replyMsg +=
            'Your end time was incorrect, please enter a valid time. Look up in the documentation with .help for more informations.';
    } else if (!checkTimesMatching(startTime, endTime)) {
        replyMsg += "Your times don't match, please enter a valid time. Look up in the documentation with .help for more informations.";
    } else if (subjectName.length <= 1) {
        replyMsg +=
            'Your subject is too short, please enter a subject with more than 1 character. Look up in the documentation with .help for more informations.';
    } else if (subjectName.length >= 30) {
        replyMsg +=
            'Your subject is too long, please enter a subject with less than 30 characters. Look up in the documentation with .help for more informations.';
    } else if (!message.guild.channels.cache.get(channel)) {
        replyMsg += 'Your channel is wrong. Look up in the documentation with .help for more informations.';
    }
    return replyMsg;
}

function isTimeOverlaped(timeObject, dayTimeTable) {
    let isTimeOverlaped = false;
    let startTime = (timeObject.startTime.hours * 60 + timeObject.startTime.minutes) * 60;
    let endTime = (timeObject.endTime.hours * 60 + timeObject.endTime.minutes) * 60;

    dayTimeTable.forEach((timeEntry) => {
        let entryStartTime = (timeEntry.startTime.hours * 60 + timeEntry.startTime.minutes) * 60;
        let entryEndTime = (timeEntry.endTime.hours * 60 + timeEntry.endTime.minutes) * 60;

        if ((startTime > entryStartTime && startTime < entryEndTime) || (endTime > entryStartTime && endTime < entryEndTime)) {
            isTimeOverlaped = true;
        }
    });
    return isTimeOverlaped;
}

function getWeekDay(dayArg) {
    dayArg = dayArg.toLowerCase();
    // dayArg = translateWeekDay(dayArg);
    let weekday;
    if (dayArg == 'mo' || dayArg == 'monday') {
        weekday = 1;
    } else if (dayArg == 'tu' || dayArg == 'tuesday') {
        weekday = 2;
    } else if (dayArg == 'we' || dayArg == 'wednesday') {
        weekday = 3;
    } else if (dayArg == 'th' || dayArg == 'thursday') {
        weekday = 4;
    } else if (dayArg == 'fr' || dayArg == 'friday') {
        weekday = 5;
    } else if (dayArg == 'sa' || dayArg == 'saturday') {
        weekday = 6;
    } else if (dayArg == 'su' || dayArg == 'sunday') {
        weekday = 7;
    } else {
        weekday = 'The weekday was wrong, please enter a valid weekday.';
    }
    return weekday;
}

// Fix this later

// function translateWeekDay(weekDay) {
//     translate(weekDay, { to: 'en' }).then(res => {
//         return res.text;
//     }).catch(err => {
//         return false;
//     });
// }

function isSameEntry(entryOne, entryTwo) {
    return (
        typeof entryOne == 'object' &&
        typeof entryTwo == 'object' &&
        entryOne.startTime.hours == entryTwo.startTime.hours &&
        entryOne.startTime.minutes == entryTwo.startTime.minutes &&
        entryOne.endTime.hours == entryTwo.endTime.hours &&
        entryOne.endTime.minutes == entryTwo.endTime.minutes &&
        entryOne.subject == entryTwo.subject
    );
}

function getTimeTableString(timeTable, timezone) {
    let stringToPrint = '';
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    weekdays.forEach((currentDay, index) => {
        let sortedTimeTable = timeTable[index + 1].slice();
        let weekDay = getLongWeekDay();
        if (sortedTimeTable.length != 0) {
            stringToPrint += `**${currentDay}** :\n`;
            sortedTimeTable = sortedTimeTable.sort((a, b) => (checkTimesMatching(a.startTime, b.startTime) ? -1 : 1));
            sortedTimeTable.forEach((element) => {
                if (weekDay == currentDay && timeInRange(element.startTime, element.endTime, timezone)) {
                    if (timeInRange(element.startTime, element.endTime, timezone)) {
                        stringToPrint += `__**${numeral(element.startTime.hours).format('00')}:${numeral(element.startTime.minutes).format(
                            '00'
                        )} - ${numeral(element.endTime.hours).format('00')}:${numeral(element.endTime.minutes).format('00')}: ${
                            element.subject
                        }**__\n`;
                    }
                } else {
                    stringToPrint += `${numeral(element.startTime.hours).format('00')}:${numeral(element.startTime.minutes).format(
                        '00'
                    )} - ${numeral(element.endTime.hours).format('00')}:${numeral(element.endTime.minutes).format('00')}: ${
                        element.subject
                    }\n`;
                }
            });
            stringToPrint += '\n';
        }
    });

    return stringToPrint;
}
function getLongWeekDay() {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[d.getDay()];
}
function timeInRange(startTime, endTime, timezone) {
    timezone = Number(timezone.split('gmt')[1]);
    let operatorString = timezone[3];
    let startTimeSec, endTimeSec;
    if (operatorString == '+') {
        startTimeSec = ((startTime.hours - timezone) * 60 + startTime.minutes) * 60;
        endTimeSec = ((endTime.hours - timezone) * 60 + endTime.minutes) * 60;
    } else {
        startTimeSec = ((startTime.hours + timezone) * 60 + startTime.minutes) * 60;
        endTimeSec = ((endTime.hours + timezone) * 60 + endTime.minutes) * 60;
    }

    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let currentTimeSec = (currentHour * 60 + currentMinute) * 60;

    return currentTimeSec > startTimeSec && currentTimeSec < endTimeSec;
}
