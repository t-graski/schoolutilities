const discord = require('discord.js');
const request = require('request');
const fs = require('fs');
const https = require('https');
exports.run = async (client, message, args) => {
    if (message) {
        // Check if an attachment is sent
        if (message.attachments) {
            // Download only mp3
            for (const attachments of message.attachments) {
                for (const attachment of attachments) {
                    if (attachment.url) {
                        attachmentURL = new URL(attachment.url);
                        const file = fs.createWriteStream('./media/file.mp3');
                        const request = https.get(attachmentURL, function (respone) {
                            respone.pipe(file);
                        });
                        playFile(client);
                    }
                }
            }
        }
    }
};
async function playFile(client) {
    let channel = client.channels.cache.get('747135561353003128');
    const connection = await channel.join();
    const dispatcher = connection.play('./media/file.mp3');
    dispatcher.on('finish', () => {
        channel.leave();
    });
}
