require('dotenv').config();
const { Client } = require('discord.js');
const postgres = require('postgres')

const PREFIX = ".";

const client = new Client();



client.on('ready', () => {
    console.log('Successfully started.');
});

client.on('message', async message => {
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(PREFIX.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (!msg.startsWith(PREFIX)) return;
    if (message.author.bot) return;

    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e.stack);
    }
})





client.login(process.env.TOKEN);

