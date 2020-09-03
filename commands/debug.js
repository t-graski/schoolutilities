const { ar } = require('google-translate-free/languages');

exports.run = async (client, message, args) => {
    let owner = ['500299416767299585', '640871953628004386'];
    if (owner.includes(message.author.id)) {
        if (args.length >= 1 && args.length < 2) {
            if (args[0].toLowerCase() == 'serverlist') {
                message.channel.send('```' + getServers(client) + '```');
                generateNewKey();
            } else if (args[0].toLowerCase() == 'key') {
                message.author.send('`' + process.env.key + '`');
            }
        }
    } else if (!owner.includes(message.author.id) && args.length > 1 && args.length < 3) {
        if (args[1] == process.env.key && args[0] == 'serverlist') {
            message.channel.send('```' + getServers(client) + '```');
            generateNewKey();
        } else {
            message.reply('The authentication key or the command is wrong').then((msg) => msg.delete({ timeout: 10000 }));
        }
    } else {
        message.reply(
            'You are not authenticated to use SchoolUtilities debug commands, if you have an authentication key, type .debug <command> <key>'
        );
    }
    function getServers(client) {
        let servers = [];
        client.guilds.cache.forEach((server) => {
            servers.push(`${server.name} (${server.id})`);
        });
        serversString = '';
        servers.forEach((server) => {
            serversString += server + '\n';
        });
        return serversString;
    }
    function generateNewKey() {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i <= 10; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        process.env.key = key;
    }
};
