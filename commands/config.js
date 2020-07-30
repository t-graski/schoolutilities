const discord = require('discord.js');
const fs = require('fs');
const datastorePath = './datastore/configs.json';
let configData;
try {
    configData = require('../datastore/configs.json');
} catch (error) {
    configData = [];
}

exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.channel.name == 'bot-config') {
            let serverArrayId
            try {
                // Refactor <-- works, but it's ugly
                if(!configData.find((configData, index) => {
                    serverArrayId = index;
                    return configData.guildId == message.guild.id;
                })){
                    configData.push({
                        guildId: message.guild.id,
                        name: message.guild.name,
                        studentId: 0,
                        teacherId: 0,
                        timeZone: "GMT+0",
                        language: "english",
                        channel: "bot-config",
                        checktime: 3000
                    });
                    serverArrayId = configData.length - 1;
                }
            } catch (error) {
                console.log(error);
            }
            if (args[0] == "student") {
                configData[serverArrayId].studentId = Number(message.guild.roles.cache.find(role => role.name === args[1]).id);
                console.table(configData)
            } else if (args[0] == "teacher") {
                configData[serverArrayId].teacherId = Number(message.guild.roles.cache.find(role => role.name === args[1]).id);
                console.table(configData)
            } else if (args[0] == "timezone") {
                configData[serverArrayId].timeZone = args[1];
                console.table(configData)
            } else if (args[0] == "language") {
                configData[serverArrayId].language = args[1];
                console.table(configData)
            } else if (args[0] == "checktime") {
                configData[serverArrayId].checktime = args[1];
                console.table(configData)
            }
            save(datastorePath, JSON.stringify(configData, null, '\t'));
        }
    }
}
function save(path, string) {
    fs.writeFile(path, string, (err) => { console.log(err ? err : ''); });
}


