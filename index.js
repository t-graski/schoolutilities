require('dotenv').config();
const { Client } = require('discord.js');
const numeral = require('numeral');
const { save } = require('./misc/utils.js');
const fs = require('fs');
const { serverConfiguration } = require('./misc/utils');

let commandInputData;
try {
    commandInputData = require('./datastore/commandInputData.json');
} catch (error) {
    commandInputData = [];
}

const client = new Client();

// Once bot is ready set an interval to check if auto precense check needs to be done
client.on('ready', () => {
    setInterval(checkPresence, 60000);
    console.log('Successfully started.');
    generateNewKey();
});
// Once bot joins a new guild, creates a bot-config channel
client.on('guildCreate', (guild) => {
    let configData;
    try {
        configData = require('./datastore/configs.json');
    } catch (error) {}
    console.log('Bot has joined the Guild ' + guild);
    configData.push({
        guildId: guild.id,
        name: guild.name,
        studentId: 0,
        teacherId: 0,
        timeZone: 'gmt+0',
        language: 'english',
        channel: 'bot-config',
        notifications: false,
        checktime: 3,
        autocheck: false,
        timeTable: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
        },
    });
    save('./datastore/configs.json', JSON.stringify(configData));
    guild.channels.create('bot-config', {
        type: 'text',
        permissionOverwrites: [
            {
                id: guild.id,
                deny: ['VIEW_CHANNEL'],
            },
        ],
    });
    let channel = guild.channels.cache.find((channel) => channel.name === 'bot-config');
    // channel.send("Hey, nice to be on your server, if you wish to use my features click on the following link: https://schoolutilities.net !");
});

// Once someone writes a message in a channel, in which bot is in
client.on('message', async (message) => {
    let prefix = serverConfiguration(message.channel.guild.id);
    if (prefix && prefix.prefix) {
        prefix = prefix.prefix;
    } else {
        prefix = process.env.PREFIX;
    }
    let msg = message.content.toUpperCase();
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if (!msg.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (msg[1] == prefix) return;
    commandInputData.push(new Date().toISOString() + ';' + message.content);
    save('./datastore/commandInputData.json', JSON.stringify(commandInputData, null, '\t'));
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        console.log(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        (await message.reply('This was a wrong command, please check the commands with .help')).delete({
            timeout: 10000,
        });
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
            if (guild) {
                let channel = guild.channels.cache.get(foundEntry.channel);
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
                        } catch (e) {}
                    }
                } else {
                    console.log('There is no channel with this Id!');
                }
            }
        }
    });
}
// Checks if a specific time is between two other times, also works with timezone
function timeInRange(startTime, endTime, timezone) {
    timezone = Number(timezone.split('gmt')[1]);
    startTime = (startTime.hours - timezone) * 60 + startTime.minutes;

    let date = new Date();
    let currentHour = date.getHours() - 1;
    let currentMinute = currentHour * 60 + date.getMinutes();
    return currentMinute == startTime;
}
// Generates a random key out of 10 characters
function generateNewKey() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i <= 10; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    process.env.key = key;
}

// import module
const express = require('express');
const https = require('https');
const http = require('http');
// var privateKey = fs.readFileSync('cert/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('cert/cert.pem', 'utf8');
// var credentials = { key: privateKey, cert: certificate };

// import router
const interfaceRouter = require('./routes/route.js');

// specify http server port
const port = 443;

// create express application
const app = express();

// mount middleware
app.use(express.static('public'));
app.use(express.json()); // parse JSON payload and place result in req.body
app.use('/api/', interfaceRouter);

// var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);
// httpsServer.listen(port, () => {
//  console.log(`Server listening on port ${port}`);
// });
httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
