require('dotenv').config();
const { Client } = require('discord.js');
const numeral = require('numeral');

// Bot prefix
const PREFIX = process.env.PREFIX;

const client = new Client();

// Once bot is ready set an interval to check if auto precense check needs to be done
client.on('ready', () => {
    setInterval(checkPresence, 60000);
    console.log('Successfully started.');
    generateNewKey();
});
// Once bot joins a new guild, creates a bot-config channel
client.on('guildCreate', (guild) => {
    console.log('Bot has joined the Guild ' + guild);
    guild.channels.create('bot-config', {
        type: 'text',
        permissionOverwrites: [
            {
                id: guild.id,
                deny: ['VIEW_CHANNEL'],
            },
        ],
    });
});
// Once someone writes a message in a channel, in which bot is in
client.on('message', async (message) => {
    let msg = message.content.toUpperCase();
    let args = message.content.slice(PREFIX.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if (msg.startsWith('!') && cmd == 'anwesenheit') {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    }
    if (!msg.startsWith(PREFIX)) return;
    if (message.author.bot) return;
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e);
        message.channel.send('This was a wrong command, please check the commands with .help');
        console.log(`There was a wrong command-input: ${cmd}`);
    }
});
// eslint-disable-next-line
client.login(process.env.TOKEN);
// Check if auto check needs to be done
function checkPresence() {
    const configData = require('./datastore/configs.json');

    configData.forEach((serverConfig) => {
        let guild = client.guilds.cache.get(serverConfig.guildId);
        let date = new Date();
        if (date.getDay() == 0) {
            date = 7;
        } else {
            date = date.getDay();
        }
        let foundEntry = serverConfig.timeTable[date].find((timeEntry) =>
            timeInRange(timeEntry.startTime, timeEntry.endTime, serverConfig.timeZone)
        );
        if (foundEntry) {
            console.log('asdflasdf');
            let channel = guild.channels.cache.get(foundEntry.channel);
            if (guild) {
                if (channel) {
                    if (serverConfig.notifications) {
                        channel.send(
                            `The subject **${foundEntry.subject}** is now starting and will take until ${numeral(
                                foundEntry.endTime.hours
                            ).format('00')}:${numeral(foundEntry.endTime.minutes).format('00')}.`
                        );
                    }
                    if (serverConfig.autocheck) {
                        try {
                            let commandFile = require(`./misc/autocheck.js`);
                            commandFile.run(channel, serverConfig.guildId, guild);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    console.log('There is no channel with this Id!');
                }
            }
        }
    });
}

function timeInRange(startTime, endTime, timezone) {
    timezone = Number(timezone.split('gmt')[1]);
    startTime = (startTime.hours - timezone) * 60 + startTime.minutes;

    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = currentHour * 60 + date.getMinutes();
    return currentMinute == startTime;
}
function generateNewKey() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i <= 10; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    process.env.key = key;
}
