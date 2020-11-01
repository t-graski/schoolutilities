let config = require('../datastore/configs.json');
const fs = require('fs');
const numeral = require('numeral');
let functions = {};
function serverConfiguration(guildId) {
    return config.find((element) => Number(guildId) == element.guildId);
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

function getWeekDay(day) {
    let weekday;
    day = day.toLowerCase();

    if (day == 'mo' || day == 'monday') {
        weekday = 1;
    } else if (day == 'tu' || day == 'tuesday') {
        weekday = 2;
    } else if (day == 'we' || day == 'wednesday') {
        weekday = 3;
    } else if (day == 'th' || day == 'thursday') {
        weekday = 4;
    } else if (day == 'fr' || day == 'friday') {
        weekday = 5;
    } else if (day == 'sa' || day == 'saturday') {
        weekday = 6;
    } else if (day == 'su' || day == 'sunday') {
        weekday = 7;
    } else {
        weekday = 'The weekday was wrong, please enter a valid weekday.';
    }
    return weekday;
}

function save(path, string) {
    fs.writeFile(path, string, (err) => {
        console.log(err ? err : '');
    });
}

functions.save = save;
functions.getWeekDay = getWeekDay;
functions.isTimeOverlaped = isTimeOverlaped;
functions.convertTimeEntryToObject = convertTimeEntryToObject;
functions.checkTimesMatching = checkTimesMatching;
functions.getTimeTableString = getTimeTableString;
functions.timeInRange = timeInRange;
functions.getLongWeekDay = getLongWeekDay;
functions.isSameEntry = isSameEntry;
functions.deleteTimeEntry = deleteTimeEntry;
functions.checkTime = checkTime;
functions.serverConfiguration = serverConfiguration;

module.exports = functions;
