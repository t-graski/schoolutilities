const discord = require('discord.js');
const fs = require('fs');
const datastorePath = './datastore/configs.json';
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
            let serverArrayId
            try {
                // Refactor <-- works, but it's ugly
                if (!configData.find((configData, index) => {
                    serverArrayId = index;
                    return configData.guildId == message.guild.id;
                })) {
                    configData.push({
                        guildId: message.guild.id,
                        name: message.guild.name,
                        studentId: 0,
                        teacherId: 0,
                        timeZone: "GMT+0",
                        language: "english",
                        channel: "bot-config",
                        checktime: 3
                    });
                    serverArrayId = configData.length - 1;
                }
            } catch (error) {
                console.log(error);
            }
            let replyMsg = "";
            if(isFirstConfig){
                replyMsg = "Hi, nice to have you in the schoolutilities community. That's your first configuration, have fun with this bot!\n";
                isFirstConfig = false;
            }
            let configInput = args[0].toLowerCase();
            if (configInput == "student") {
                configData[serverArrayId].studentId = message.guild.roles.cache.find(role => role.name.toLowerCase() === args[1].toLowerCase()).id;
                console.table(configData);
                replyMsg += `Your student role has been updated.`;
            } else if (configInput == "teacher") {
                configData[serverArrayId].teacherId = message.guild.roles.cache.find(role => role.name.toLowerCase() === args[1].toLowerCase()).id;
                console.table(configData);
                replyMsg += `Your teacher role has been updated.`;
            } else if (configInput == "timezone") {
                configData[serverArrayId].timeZone = args[1].toLowerCase();
                console.table(configData);
                replyMsg += `Your timezone has been updated.`;
            } else if (configInput == "language") {
                configData[serverArrayId].language = args[1].toLowerCase();
                console.table(configData);
                replyMsg += `Your language has been updated.`;
            } else if (configInput == "checktime") {
                configData[serverArrayId].checktime = args[1];
                console.table(configData);
                replyMsg += `Your checktime has been updated.`;
            } else {
                replyMsg += `There was a problem updating your config, please check, if you've written it correctly.`
            }
            message.channel.send(replyMsg);
            save(datastorePath, JSON.stringify(configData, null, '\t'));
        }
    }
}
function save(path, string) {
    fs.writeFile(path, string, (err) => { console.log(err ? err : ''); });
}
