const discord = require('discord.js');
const request = require('request');
const fs = require('fs');
const https = require('https');
const { serverConfiguration } = require('../misc/utils.js');
<<<<<<< Updated upstream
// Ugly <-- Refactor
let id;
=======
>>>>>>> Stashed changes
exports.run = async (client, message, args) => {
    let serverConfigurationData = serverConfiguration(message.guild.id);
    if (serverConfigurationData) {
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(serverConfigurationData.teacherId)) {
            if (message) {
                // Check if an attachment is sent
                if (message.attachments) {
                    for (const attachments of message.attachments) {
                        for (const attachment of attachments) {
                            if (attachment.url) {
                                attachmentURL = new URL(attachment.url);
                                const file = fs.createWriteStream('./media/file.mp3');
                                const request = https.get(attachmentURL, function (respone) {
                                    respone.pipe(file);
                                });
<<<<<<< Updated upstream
                                let channelName = correctChannelNameCase(args[0]);
                                let voiceChannel = getChannelId(channelName, message);
                                playFile(client, id);
=======
                                try {
                                    let channel = client.channels.cache.get(getChannelId(args[0], message));
                                    const connection = await channel.join();
                                    const dispatcher = await connection.play('./media/file.mp3');
                                    dispatcher.on('finish', () => {
                                        
                                    });
                                } catch (err) {
                                    console.log(err);
                                    message.channel.send('The given channel could not be found.');
                                }
>>>>>>> Stashed changes
                            }
                        }
                    }
                }
            }
        }
    }
};
async function playFile(client, voiceChannel) {
    let channel = client.channels.cache.get(voiceChannel);
    const connection = await channel.join();
    const dispatcher = connection.play('./media/file.mp3');
    dispatcher.on('finish', () => {
        console.log('finish');
        channel.leave();
    });
}
<<<<<<< Updated upstream
function correctChannelNameCase(channelName) {
    subString = channelName.substring(1).toLowerCase();
    channelName = channelName[0].toUpperCase() + subString;
    return channelName;
}
function getChannelId(channelName, message) {
    message.guild.channels.cache.forEach((channel) => {
        if (channel.type == 'voice' && channel.name == channelName) {
            id = channel.id;
        }
    });
=======
function getChannelId(channelName, message) {
    let id;
    let channel = message.guild.channels.cache.find((channel) => {
        return channel.type == 'voice' && channel.name.toLowerCase() == channelName.toLowerCase();
    });
    return channel ? channel.id : false;
>>>>>>> Stashed changes
}
