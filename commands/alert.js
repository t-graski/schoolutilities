let configData = require('../datastore/configs.json');
const { serverConfiguration } = require('../utils.js');

exports.run = async (client, message, args) => {
    let serverConfigurationData = serverConfiguration(message.guild.id);
    if (serverConfigurationData) {
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(serverConfigurationData.teacherId)) {
            if (args.length) {
                let studentId = serverConfigurationData.studentId;
                let students = message.guild.roles.cache.get(studentId).members.map(m => m.user.id);
                let msg = args.slice(0).reduce((a, b) => a + " " + b);
                students.forEach(user => {
                    client.users.cache.get(user).send(`${message.author} sent you the message:\n**${msg}**`);

                })
            }
        }
    }


}