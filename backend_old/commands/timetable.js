const fs = require('fs');
const datastorePath = './datastore/configs.json';
const numeral = require('numeral');
let configData;
configData = require('../datastore/configs.json');

exports.run = async (client, message, args) => {
    let serverArrayId;
    let replyMsg = 'This command is wrong, please look in the documentation with .help for help.';
    if (
        !configData.find((configData, index) => {
            serverArrayId = index;
            return configData.guildId == message.channel.guild.id;
        })
    ) {
        replyMsg = 'Please config your server, for more informations type .help';
    }
    if (args[0].toLowerCase() == 'print') {
        console.log(configData[serverArrayId]);
        replyMsg = getTimeTableString(configData[serverArrayId].timeTable, configData[serverArrayId].timeZone);
    }
    message.channel.send(replyMsg);
};
function checkTimesMatching(startTime, endTime) {
    return (startTime.hours == endTime.hours && startTime.minutes < endTime.minutes) || startTime.hours < endTime.hours;
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
    if (!stringToPrint) {
        stringToPrint = 'Your timetable is empty! Add something.';
    }

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
    let operatorString = timezone[3];
    timezone = Number(timezone.split('gmt')[1]);
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
