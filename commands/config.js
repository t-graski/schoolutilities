const discord = require('discord.js');
let configData = {
    guildId: 0,
    studentId: 0,
    teacherId: 0,
    timeZone: "GMT+0",
    language: "english",
    channel: "bot-config",
    checktime: 3000
}

exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.channel.name == 'bot-config') {
            configData.guildId = message.guild.id;
            if (args[0] == "student") {
                configData.studentId = Number(message.guild.roles.cache.find(role => role.name === args[1]).id);
                console.table(configData)
            } else if (args[0] == "teacher") {
                configData.teacherId = Number(message.guild.roles.cache.find(role => role.name === args[1]).id);
                console.table(configData)
            } else if (args[0] == "timezone") {
                configData.timeZone = args[1];
                console.table(configData)
            } else if (args[0] == "language") {
                configData.language = args[1];
                console.table(configData)
            } else if (args[0] == "checktime") {
                configData.checktime = args[1];
                console.table(configData)
            }

        }
    }
}