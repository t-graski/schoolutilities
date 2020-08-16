const discord = require('discord.js');
const { serverConfiguration } = require('../utils.js');
exports.run = async (client, message, args) => {
    message.guild.channels.create('bot-config', {
        type: 'text',
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: serverConfiguration(message.guild.id).studentId,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: serverConfiguration(message.guild.id).teacherId,
                allow: ['VIEW_CHANNEL']
            }
        ]
    });
}