const { messageHandler } = require('../misc/messageHandler.js');

exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR') && message.channel.name == 'bot-config') {
        messageHandler(message, args);
    }
};
