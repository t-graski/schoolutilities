const discord = require('discord.js');
const request = require('request');
(fs = require('fs')),
    (exports.run = async (client, message, args) => {
        if (message) {
            // Check if an attachment is sent
            if (message.attachments) {
                // Download only mp3
                for (const attachments of message.attachments) {
                    for (const attachment of attachments) {
                        if (attachment.url) {
                            console.log(new URL(attachment.url));
                            download(new URL(attachment.url));
                        }
                    }
                }
            }
        }
    });

function download(url) {
    request.get({ uri: url }, {}).on('error', console.error).pipe(fs.createWriteStream('meme.png'));
}
